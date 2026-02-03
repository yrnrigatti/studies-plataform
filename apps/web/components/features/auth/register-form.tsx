'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@repo/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@repo/ui/form';
import { Input } from '@repo/ui/input';
import { useToast } from '@repo/ui/use-toast';


import { registerSchema, type RegisterFormValues } from '@/lib/schemas/auth';

import { createClient } from "@/lib/supabase/client"

export function RegisterForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: RegisterFormValues) {
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
            });

            if (error) {
                if (error.message.includes('already registered')) {
                    form.setError('email', { message: 'Email already registered' });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Registration Failed',
                        description: error.message,
                    });
                }
                return;
            }

            toast({
                title: 'Success',
                description: 'Account created successfully. Redirecting...',
            });

            router.push('/dashboard'); // Redirect to dashboard after signup
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Something went wrong. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign Up
                    </Button>
                </form>
            </Form>
        </div>
    );
}
