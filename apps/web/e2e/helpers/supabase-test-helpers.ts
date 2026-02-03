import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// For admin operations, you'd need the service role key
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Delete a test user from the database
 * Note: This requires admin/service role access in a real scenario
 */
export async function cleanupTestUser(email: string): Promise<void> {
    try {
        // In a local/test environment, you might be able to delete via SQL
        // For production, you'd need to use Supabase Admin API with service role key
        const { error } = await supabase.from('users').delete().eq('email', email);

        if (error) {
            console.warn(`Failed to cleanup user ${email}:`, error);
        }
    } catch (error) {
        console.warn(`Error during cleanup for ${email}:`, error);
    }
}

/**
 * Verify if a user exists in the database
 */
export async function getUserFromDB(email: string): Promise<any | null> {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No rows returned
                return null;
            }
            throw error;
        }

        return data;
    } catch (error) {
        console.error(`Error fetching user ${email}:`, error);
        return null;
    }
}

/**
 * Reset test database to clean state
 * Use with caution!
 */
export async function resetTestDatabase(): Promise<void> {
    try {
        // Delete all test users (those with emails containing 'test-' prefix)
        const { error } = await supabase.from('users').delete().like('email', 'test-%');

        if (error) {
            console.warn('Failed to reset test database:', error);
        }
    } catch (error) {
        console.warn('Error during database reset:', error);
    }
}

/**
 * Generate a unique test email
 */
export function generateTestEmail(): string {
    return `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;
}
