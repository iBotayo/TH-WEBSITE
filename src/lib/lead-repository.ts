/**
 * Lead Storage Abstraction
 * 
 * Provides a provider-neutral interface for persisting lead submissions.
 * Persistent storage destination remains pending business owner approval.
 */

export interface LeadRecord {
  type: 'discovery_call' | 'profile_download';
  name: string;
  email: string;
  organisation: string;
  role?: string;
  phone?: string;
  challenge?: string;
  submittedAt: string; // ISO 8601 timestamp
  ipAddress?: string;
  userAgent?: string;
}

export interface LeadRepositoryResult {
  success: boolean;
  leadId?: string;
  error?: string;
}

export interface LeadRepository {
  saveLead(lead: LeadRecord): Promise<LeadRepositoryResult>;
}

/**
 * DEVELOPMENT ONLY: Logs lead submissions to stdout.
 * Must NOT be used as production persistent storage.
 */
export class DevelopmentLoggingLeadRepository implements LeadRepository {
  async saveLead(lead: LeadRecord): Promise<LeadRepositoryResult> {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        '[LEAD STORAGE WARNING] DevelopmentLoggingLeadRepository is active in production. ' +
        'Leads will not be persisted to a permanent storage destination until configured.'
      );
    }

    console.info(
      '[DEV ONLY - LEAD CAPTURED]:',
      JSON.stringify(
        {
          type: lead.type,
          name: lead.name,
          email: lead.email,
          organisation: lead.organisation,
          submittedAt: lead.submittedAt,
        },
        null,
        2
      )
    );

    return {
      success: true,
      leadId: `dev-lead-${Date.now()}`,
    };
  }
}

// Development default lead repository instance
export const defaultLeadRepository = new DevelopmentLoggingLeadRepository();

