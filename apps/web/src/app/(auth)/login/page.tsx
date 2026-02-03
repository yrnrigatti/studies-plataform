import Link from 'next/link';
import { LoginForm } from "@/components/features/auth/login-form"
import { BookOpen } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@repo/ui/card';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-8">
            <div className="w-full max-w-[420px] space-y-6">
                {/* Logo / Brand */}
                <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <BookOpen className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Enter your details to access your progress and continue learning.
                    </p>
                </div>

                {/* Main Card */}
                <Card className="border-border shadow-xl shadow-black/5">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email and password to login
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                </Card>

                {/* Register Link */}
                <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/register"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}
