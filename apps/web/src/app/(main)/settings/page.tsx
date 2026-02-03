import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DeleteAccountDialog } from '@/components/features/account/delete-account-dialog';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@repo/ui/card';

export default async function SettingsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    if (!user.email) {
        return (
            <div className="container mx-auto py-8 px-4 max-w-2xl">
                <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
                <p className="text-destructive">
                    Error: Unable to load user information. Please try logging in again.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

            <Card className="border-red-200">
                <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>
                        Irreversible actions that will permanently affect your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Delete Account</h3>
                        <p className="text-sm text-muted-foreground">
                            Once you delete your account, there is no going back. This will
                            permanently delete your account and remove all your data from our
                            servers.
                        </p>
                        <DeleteAccountDialog userEmail={user.email} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
