import rateLimit from 'express-rate-limit';
import type { Request, Response } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    rateLimit?: {
      limit: number;
      current: number;
      remaining: number;
      resetTime: Date;
    };
  }
}

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP address',
    retryAfter: '15 minutes',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'Too many requests from this IP, please try again later',
    });
  },
});

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too many authentication attempts',
    retryAfter: '10 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (req: Request, res: Response) => {
    const remaining = req.rateLimit?.remaining ?? 0;
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: `Too many login attempts. Try again in 10 minutes.`,
      remainingAttempts: remaining,
    });
  },
});

export const commentSpamLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req: Request) => req.user?.id || '', // use authenticated user's ID for rate limiting
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      message: 'Your limit to comment has been exceeded. Try after 60 seconds',
    });
  },
  skip: (req: Request) => !req.user, // skips unauthenticated/guest users
});
