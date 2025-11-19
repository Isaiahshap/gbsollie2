/**
 * Rate limiting utility to prevent spam and bot attacks
 * Uses in-memory storage - for production, consider Redis or similar
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory storage for rate limiting
const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, email, etc.)
 * @param config - Rate limit configuration
 * @returns true if rate limited, false if allowed
 */
export function isRateLimited(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 60 * 1000 }
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // First request from this identifier
  if (!entry) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return false;
  }

  // Window has expired, reset counter
  if (entry.resetAt < now) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return false;
  }

  // Increment counter
  entry.count++;

  // Check if rate limit exceeded
  if (entry.count > config.maxRequests) {
    return true;
  }

  return false;
}

/**
 * Get rate limit info for debugging
 */
export function getRateLimitInfo(identifier: string): RateLimitEntry | null {
  return rateLimitMap.get(identifier) || null;
}

/**
 * Clear rate limit for an identifier
 */
export function clearRateLimit(identifier: string): void {
  rateLimitMap.delete(identifier);
}

