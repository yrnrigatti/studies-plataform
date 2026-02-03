'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteAccount(confirmation: string) {
    try {
        // Get current authenticated user
        const supabase = await createClient();
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return { error: 'Not authenticated' };
        }

        // Validate confirmation matches "DELETE" or user's email (trimmed, case-sensitive)
        const trimmedConfirmation = confirmation.trim();
        const isValid = trimmedConfirmation === 'DELETE' || trimmedConfirmation === user.email;

        if (!isValid) {
            return { error: 'Invalid confirmation. Please type DELETE or your email.' };
        }

        // Audit log: Deletion initiated
        console.log(`[AUDIT] User deletion initiated: ${user.id} at ${new Date().toISOString()}`);

        // Create admin client for privileged operations
        const supabaseAdmin = createAdminClient();

        // Step 1: Delete auth account FIRST (cannot be rolled back, so do it first)
        // If this fails, nothing is deleted - safest approach
        const { error: authDeleteError } = await supabaseAdmin.auth.admin.deleteUser(
            user.id
        );

        if (authDeleteError) {
            console.error('[AUDIT] Auth deletion failed:', authDeleteError);
            return { error: 'Failed to delete account. Please try again.' };
        }

        // Step 2: Delete user record from database
        // If this fails after auth deletion, user can't login but data remains
        // This is preferable to the opposite (data deleted, auth remains = ghost account)
        const { error: dbError } = await supabaseAdmin
            .from('users')
            .delete()
            .eq('id', user.id);

        if (dbError) {
            console.error('[AUDIT] Database deletion failed after auth deletion:', dbError);
            // Auth already deleted - user can't login anymore
            // Log for manual cleanup but inform user account is inaccessible
            return {
                error:
                    'Account deleted but data cleanup incomplete. Your account is no longer accessible. Please contact support if needed.',
            };
        }

        // Audit log: Deletion completed successfully
        console.log(`[AUDIT] User deletion completed: ${user.id} at ${new Date().toISOString()}`);

        // Return success - signOut will be handled client-side to avoid race conditions
        return { success: true, shouldSignOut: true };
    } catch (error) {
        console.error('[AUDIT] Unexpected error during account deletion:', error);
        return { error: 'An unexpected error occurred. Please try again later.' };
    }
}
