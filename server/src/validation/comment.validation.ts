import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment content cannot be empty.')
    .max(2200, 'Your comment has exceeded the max limit of 2200 characters'),
});

export type createCommentInput = z.infer<typeof createCommentSchema>;
