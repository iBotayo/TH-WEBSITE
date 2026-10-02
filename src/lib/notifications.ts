/**
 * Notification Interfaces
 * 
 * Provider-agnostic abstractions for operational alerts (WhatsApp, Email).
 * Production providers remain pending business owner selection.
 */

import { LeadRecord } from './lead-repository';

export interface NotificationResult {
  success: boolean;
  error?: string;
}

export interface WhatsAppNotifier {
  sendAlert(lead: LeadRecord): Promise<NotificationResult>;
}

export interface EmailNotifier {
  sendDiscoveryNotification(lead: LeadRecord): Promise<NotificationResult>;
  sendProfileDownloadNotification(lead: LeadRecord): Promise<NotificationResult>;
}

/**
 * DEVELOPMENT STUB: Logs WhatsApp alert to console.
 * Real WhatsApp provider (Twilio, Meta Cloud API, etc.) pending business selection.
 */
export class ConsoleWhatsAppNotifier implements WhatsAppNotifier {
  async sendAlert(lead: LeadRecord): Promise<NotificationResult> {
    console.info(
      '[DEV ONLY - WHATSAPP ALERT STUB]:',
      `New discovery call from ${lead.name} (${lead.organisation}) - ${lead.email}`
    );
    return { success: true };
  }
}

/**
 * DEVELOPMENT STUB: Logs Email notification to console.
 * Production email provider (Resend, Postmark, SendGrid) pending business selection.
 * Documented primary recipient: thinkingheadng@gmail.com
 */
export class ConsoleEmailNotifier implements EmailNotifier {
  private primaryRecipient = 'thinkingheadng@gmail.com';

  async sendDiscoveryNotification(lead: LeadRecord): Promise<NotificationResult> {
    console.info(
      `[DEV ONLY - EMAIL DISPATCH TO ${this.primaryRecipient}]:`,
      `Discovery Call Request from ${lead.name} (${lead.organisation})`
    );
    return { success: true };
  }

  async sendProfileDownloadNotification(lead: LeadRecord): Promise<NotificationResult> {
    console.info(
      `[DEV ONLY - EMAIL DISPATCH TO ${this.primaryRecipient}]:`,
      `Corporate Profile Download by ${lead.name} (${lead.organisation})`
    );
    return { success: true };
  }
}

// Development default notifier instances
export const defaultEmailNotifier = new ConsoleEmailNotifier();
export const defaultWhatsAppNotifier = new ConsoleWhatsAppNotifier();

