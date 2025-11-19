/**
 * Bot detection utilities
 * Identifies and blocks common bot patterns
 */

import { NextRequest } from 'next/server';

/**
 * List of known bot user agents
 */
const BOT_USER_AGENTS = [
  'bot',
  'crawler',
  'spider',
  'scraper',
  'curl',
  'wget',
  'python-requests',
  'go-http-client',
  'apache-httpclient',
  'java/',
  'scrapy',
  'node-fetch',
  'axios',
  'phantomjs',
  'headless',
];

/**
 * Suspicious patterns in email addresses
 */
const SUSPICIOUS_EMAIL_PATTERNS = [
  /test@test\.com/i,
  /example@example\.com/i,
  /^test\d+@/i,
  /^user\d+@/i,
  /@temp\./i,
  /@disposable\./i,
  /@guerrillamail\./i,
  /@10minutemail\./i,
  /@mailinator\./i,
  /^\w{30,}@/i, // Very long usernames are often bot-generated
];

/**
 * Suspicious patterns in names
 */
const SUSPICIOUS_NAME_PATTERNS = [
  /test\s*user/i,
  /^test$/i,
  /^user$/i,
  /^\w{50,}$/i, // Very long single words
  /^[a-z]+\d{5,}$/i, // Letters followed by many numbers
  /http/i, // URLs in names
  /www\./i,
];

/**
 * Check if user agent indicates a bot
 */
export function isBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return true; // No user agent is suspicious
  
  const lowerUA = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => lowerUA.includes(bot));
}

/**
 * Check if email looks suspicious
 */
export function isSuspiciousEmail(email: string): boolean {
  return SUSPICIOUS_EMAIL_PATTERNS.some(pattern => pattern.test(email));
}

/**
 * Check if name looks suspicious
 */
export function isSuspiciousName(name: string): boolean {
  // Empty or very short names
  if (!name || name.trim().length < 2) return true;
  
  return SUSPICIOUS_NAME_PATTERNS.some(pattern => pattern.test(name));
}

/**
 * Check if submission timing is suspicious
 * Real users typically take at least 2-3 seconds to fill a form
 */
export function isSuspiciousTiming(timestamp: number, submitTime: number): boolean {
  const timeSpent = submitTime - timestamp;
  
  // Too fast (less than 2 seconds)
  if (timeSpent < 2000) return true;
  
  // Too slow (more than 30 minutes) - could be a bot that waits
  if (timeSpent > 30 * 60 * 1000) return true;
  
  return false;
}

/**
 * Comprehensive bot check for form submissions
 */
export interface BotCheckParams {
  request: NextRequest;
  name: string;
  email: string;
  timestamp?: number;
  submitTime?: number;
}

export interface BotCheckResult {
  isBot: boolean;
  reason?: string;
  confidence: 'high' | 'medium' | 'low';
}

export function checkIfBot(params: BotCheckParams): BotCheckResult {
  const { request, name, email, timestamp, submitTime } = params;
  
  // Check user agent
  const userAgent = request.headers.get('user-agent');
  if (isBotUserAgent(userAgent)) {
    return {
      isBot: true,
      reason: 'Suspicious user agent',
      confidence: 'high',
    };
  }
  
  // Check for missing required headers
  const acceptHeader = request.headers.get('accept');
  const referer = request.headers.get('referer');
  if (!acceptHeader || !referer) {
    return {
      isBot: true,
      reason: 'Missing required headers',
      confidence: 'medium',
    };
  }
  
  // Check email pattern
  if (isSuspiciousEmail(email)) {
    return {
      isBot: true,
      reason: 'Suspicious email pattern',
      confidence: 'high',
    };
  }
  
  // Check name pattern
  if (isSuspiciousName(name)) {
    return {
      isBot: true,
      reason: 'Suspicious name pattern',
      confidence: 'high',
    };
  }
  
  // Check timing if provided
  if (timestamp && submitTime) {
    if (isSuspiciousTiming(timestamp, submitTime)) {
      return {
        isBot: true,
        reason: 'Suspicious form completion time',
        confidence: 'medium',
      };
    }
  }
  
  // Passed all checks
  return {
    isBot: false,
    confidence: 'low',
  };
}

