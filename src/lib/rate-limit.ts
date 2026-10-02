/**
 * Rate Limiting Abstraction
 * 
 * Provides an interface for endpoint throttling.
 * Production implementation depends on final hosting deployment (Cloudflare / Vercel).
 */

export interface RateLimitResult {
  isRateLimited: boolean;
  remaining: number;
  resetTime: number; // Unix timestamp in ms
}

export interface RateLimiter {
  checkLimit(identifier: string): Promise<RateLimitResult>;
}

/**
 * DEVELOPMENT ONLY: In-memory sliding-window rate limiter.
 * Suitable for local development and integration tests only.
 * Does NOT provide distributed protection in serverless/edge environments.
 */
export class MemoryRateLimiter implements RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 600000, maxRequests: number = 5) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  async checkLimit(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    const timestamps = (this.requests.get(identifier) || []).filter(
      (time) => now - time < this.windowMs
    );

    if (timestamps.length >= this.maxRequests) {
      return {
        isRateLimited: true,
        remaining: 0,
        resetTime: now + this.windowMs,
      };
    }

    timestamps.push(now);
    this.requests.set(identifier, timestamps);

    return {
      isRateLimited: false,
      remaining: this.maxRequests - timestamps.length,
      resetTime: now + this.windowMs,
    };
  }
}
