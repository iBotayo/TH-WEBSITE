import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { profileDownloadSchema } from '@/lib/validation';
import { defaultRateLimiter } from '@/lib/rate-limit';
import { defaultLeadRepository, LeadRecord } from '@/lib/lead-repository';
import { defaultEmailNotifier } from '@/lib/notifications';

const MAX_PAYLOAD_SIZE = 50 * 1024; // 50 KB

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Enforce payload size constraint
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'Payload exceeds maximum permitted size of 50 KB.',
        },
        { status: 413 }
      );
    }

    // 2. Parse request body safely
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Malformed or invalid JSON payload.',
        },
        { status: 400 }
      );
    }

    // 3. Honeypot check (client_secondary_contact)
    if (
      typeof rawBody === 'object' &&
      rawBody !== null &&
      'client_secondary_contact' in rawBody &&
      Boolean((rawBody as Record<string, unknown>).client_secondary_contact)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Submission rejected.',
        },
        { status: 403 }
      );
    }

    // 4. Rate Limiting via provider-neutral abstraction
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const rateLimit = await defaultRateLimiter.checkLimit(`profile:${clientIp}`);
    if (rateLimit.isRateLimited) {
      const retryAfterSec = Math.max(1, Math.ceil((rateLimit.resetTime - Date.now()) / 1000));
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests from this connection. Please wait before trying again.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSec),
          },
        }
      );
    }

    // 5. Server-side validation via authoritative Zod schema
    const validationResult = profileDownloadSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed. Please verify the submitted information.',
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 6. Normalize LeadRecord
    const leadRecord: LeadRecord = {
      type: 'profile_download',
      name: validData.name,
      email: validData.email,
      organisation: validData.organisation,
      submittedAt: new Date().toISOString(),
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent') || undefined,
    };

    // 7. Persist via provider-neutral LeadRepository
    const saveResult = await defaultLeadRepository.saveLead(leadRecord);
    if (!saveResult.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Unable to process your request at this time. Please contact us directly at hello@thinkinghead.ng.',
        },
        { status: 500 }
      );
    }

    // 8. Trigger provider-neutral email notification
    try {
      await defaultEmailNotifier.sendProfileDownloadNotification(leadRecord);
    } catch (notifyError) {
      console.error('[Profile Notification Failure]:', notifyError);
    }

    // 9. Check physical availability of the 16-page Corporate Profile PDF
    const profileAssetPath = path.join(
      process.cwd(),
      'public',
      'assets',
      'docs',
      'THL_Corporate_Profile.pdf'
    );
    const fileAvailable = fs.existsSync(profileAssetPath);

    if (fileAvailable) {
      return NextResponse.json(
        {
          success: true,
          message: 'Verification confirmed. Your Corporate Profile download is ready.',
          fileAvailable: true,
          downloadUrl: '/assets/docs/THL_Corporate_Profile.pdf',
        },
        { status: 200 }
      );
    }

    // Controlled response when PDF asset is not yet delivered by client
    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you for your interest. The official 16-page Corporate Profile is currently in final editorial preparation. We have logged your verified request and will deliver it directly to your email as soon as published.',
        fileAvailable: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      '[Unhandled Profile Download API Error]:',
      error instanceof Error ? error.message : 'Unknown'
    );
    return NextResponse.json(
      {
        success: false,
        message:
          'An unexpected error occurred while processing your request. Please try again later.',
      },
      { status: 500 }
    );
  }
}
