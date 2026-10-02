import { z } from 'zod';

/**
 * Discovery Call Form Schema (FR-01)
 * Validates fields, data types, formats, string length constraints, and honeypot.
 */
export const discoveryCallSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name must not exceed 100 characters.' }),
  organisation: z
    .string()
    .trim()
    .min(2, { message: 'Organisation must be at least 2 characters.' })
    .max(120, { message: 'Organisation must not exceed 120 characters.' }),
  role: z
    .string()
    .trim()
    .min(2, { message: 'Role or title must be at least 2 characters.' })
    .max(100, { message: 'Role must not exceed 100 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address.' })
    .max(120, { message: 'Email must not exceed 120 characters.' }),
  phone: z
    .string()
    .trim()
    .min(7, { message: 'Phone number must be at least 7 characters.' })
    .max(25, { message: 'Phone number must not exceed 25 characters.' })
    .regex(/^[+0-9\s\-()]+$/, { message: 'Please enter a valid phone number.' }),
  challenge: z
    .string()
    .trim()
    .min(10, { message: 'Please provide at least 10 characters describing the challenge.' })
    .max(2000, { message: 'Challenge description must not exceed 2000 characters.' }),
  // Honeypot field: must remain empty; bots filling this are rejected
  client_secondary_contact: z.string().max(0, { message: 'Bot detected.' }).optional(),
});

export type DiscoveryCallInput = z.infer<typeof discoveryCallSchema>;

/**
 * Corporate Profile Gated Download Schema (FR-02)
 */
export const profileDownloadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name must not exceed 100 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address.' })
    .max(120, { message: 'Email must not exceed 120 characters.' }),
  organisation: z
    .string()
    .trim()
    .min(2, { message: 'Organisation must be at least 2 characters.' })
    .max(120, { message: 'Organisation must not exceed 120 characters.' }),
  // Honeypot field
  client_secondary_contact: z.string().max(0, { message: 'Bot detected.' }).optional(),
});

export type ProfileDownloadInput = z.infer<typeof profileDownloadSchema>;
