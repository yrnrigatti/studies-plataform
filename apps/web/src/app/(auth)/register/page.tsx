import Link from 'next/link';
import { RegisterForm } from '@/components/features/auth/register-form';
import { BookOpen } from 'lucide-react';
import { Button } from '@repo/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@repo/ui/card';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-8">
            <div className="w-full max-w-[420px] space-y-6">
                {/* Logo / Brand */}
                <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <BookOpen className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Start your journey
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Create an account to conquer your study material with the 30-page method.
                    </p>
                </div>

                {/* Main Card */}
                <Card className="border-border shadow-xl shadow-black/5">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl">Create Account</CardTitle>
                        <CardDescription>
                            Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-sm text-muted-foreground text-center">
                            By clicking continue, you agree to our{' '}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </div>
                    </CardFooter>
                </Card>

                {/* Login Link */}
                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
