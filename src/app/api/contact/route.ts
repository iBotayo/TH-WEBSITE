import { NextRequest, NextResponse } from 'next/server';
import { discoveryCallSchema } from '@/lib/validation';
import { defaultRateLimiter } from '@/lib/rate-limit';
import { defaultLeadRepository, LeadRecord } from '@/lib/lead-repository';
import { defaultEmailNotifier, defaultWhatsAppNotifier } from '@/lib/notifications';

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
    // Automated bots often populate all hidden form fields.
    if (
      typeof rawBody === 'object' &&
      rawBody !== null &&
      'client_secondary_contact' in rawBody &&
      Boolean((rawBody as Record<string, unknown>).client_secondary_contact)
    ) {
      // Reject bot submission without revealing internal spam heuristics
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

    const rateLimit = await defaultRateLimiter.checkLimit(`contact:${clientIp}`);
    if (rateLimit.isRateLimited) {
      const retryAfterSec = Math.max(1, Math.ceil((rateLimit.resetTime - Date.now()) / 1000));
      return NextResponse.json(
        {
          success: false,
          message: 'Too many submissions from this connection. Please wait before trying again.',
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
    const validationResult = discoveryCallSchema.safeParse(rawBody);
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
      type: 'discovery_call',
      name: validData.name,
      email: validData.email,
      organisation: validData.organisation,
      role: validData.role,
      phone: validData.phone,
      challenge: validData.challenge,
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
            'Unable to process your submission at this time. Please reach out directly to hello@thinkinghead.ng.',
        },
        { status: 500 }
      );
    }

    // 8. Trigger provider-neutral notification dispatches (non-blocking for user response)
    try {
      await Promise.allSettled([
        defaultEmailNotifier.sendDiscoveryNotification(leadRecord),
        defaultWhatsAppNotifier.sendAlert(leadRecord),
      ]);
    } catch (notifyError) {
      // Log notification failure without interrupting client confirmation
      console.error('[Notification dispatch failure]:', notifyError);
    }

    // 9. Return approved BRD confirmation language
    return NextResponse.json(
      {
        success: true,
        message: 'We’ve received your message. You’ll hear from Ben within 24 hours.',
        leadId: saveResult.leadId,
      },
      { status: 201 }
    );
  } catch (error) {
    // Prevent sensitive system exception leakage
    console.error('[Unhandled Contact API Error]:', error instanceof Error ? error.message : 'Unknown');
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while processing your request. Please try again later.',
      },
      { status: 500 }
    );
  }
}
