import { z } from 'zod';

export const deleteAccountSchema = z.object({
    confirmation: z.string().min(1, { message: 'Confirmation is required' }),
});

export type DeleteAccountData = z.infer<typeof deleteAccountSchema>;
