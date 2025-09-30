import {z} from 'zod'

export const createPostSchema = z.object({
    title: z.string().min(3, "Title is required"),
    content: z.string().optional(),
    published: z.boolean().default(false),
    imageUrl: z.url("Image URL should be a valid URL").optional()
})

export const updatePostSchema = z.object({
    title: z.string().min(3, "Title is required").optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
    imageUrl: z.url("Image URL should be a valid URL").optional()
})

export type createPostsInput = z.infer<typeof createPostSchema>
export type updatePostsInput = z.infer<typeof updatePostSchema>
