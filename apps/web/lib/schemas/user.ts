import * as z from 'zod';

export const profileSchema = z.object({
    email: z.string().email().optional().readonly(),
    displayName: z
        .string()
        .min(2, { message: 'Display name must be at least 2 characters long.' })
        .max(50, { message: 'Display name must be less than 50 characters.' }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
