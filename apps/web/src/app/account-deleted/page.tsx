import Link from 'next/link';
import { Button } from '@repo/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@repo/ui/card';

export default function AccountDeletedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle>Account Deleted</CardTitle>
                    <CardDescription>
                        Your account has been permanently deleted
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Your account and all associated data have been permanently removed
                        from our servers. You can no longer log in with your previous
                        credentials.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Thank you for using our service. If you change your mind in the
                        future, you're always welcome to create a new account.
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Button asChild className="w-full sm:w-auto">
                            <Link href="/">Go to Homepage</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full sm:w-auto">
                            <Link href="/register">Create New Account</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
