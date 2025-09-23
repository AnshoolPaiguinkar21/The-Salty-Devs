import {z} from 'zod'

export const registerUserSchema = z.object({
    name: z.string().min(2, "Name must atleast 2 characters long"),
    email: z.email(),
    password: z.string().min(8, "Password must be atleast 8 characters long"),
    bio: z.string().optional(),
})