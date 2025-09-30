import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const envSchema = z.object({
  PORT: z.coerce.number().default(4000), // PORT: 4000 by default 
  DATABASE_URL: z.url(), 
  JWT_SECRET_KEY: z.string().min(7),
  JWT_REFRESH_SECRET_KEY: z.string().min(7),
  ACCESS_TOKEN_EXPIRES_IN: z.coerce.number(), // 1 hour (3600 seconds)
  REFRESH_TOKEN_EXPIRES_IN: z.coerce.number(), // 24 hours (86400 seconds)
});

let config: z.infer<typeof envSchema>;

try {
  config = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    const formattedError = fromZodError(error, {
      prefix: 'Invalid environment variables',
      prefixSeparator: ' - ',
      issueSeparator: '\n',
    });
    console.error(formattedError.message);
  } else {
    console.error('An unexpected error occurred during configuration loading:', error);
  }
  process.exit(1);
}

export default config;
