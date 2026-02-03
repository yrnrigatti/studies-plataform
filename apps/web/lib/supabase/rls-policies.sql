-- RLS Policy for Account Deletion
-- This ensures users can only delete their own account

-- Enable RLS on users table (if not already enabled)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to delete their own account
CREATE POLICY "Users can delete own account"
ON users
FOR DELETE
USING (auth.uid() = id);

-- Note: This policy is required for the delete operation in deleteAccount server action
-- Without this policy, the deletion will fail even with service role key
-- because we're using supabaseAdmin.from('users').delete()
