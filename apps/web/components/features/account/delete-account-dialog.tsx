'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@repo/ui/alert-dialog';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import { toast } from '@repo/ui/use-toast';
import { deleteAccount } from '@/lib/actions/user';

const deleteAccountSchema = z.object({
    confirmation: z.string().min(1, 'Confirmation is required'),
});

type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;

interface DeleteAccountDialogProps {
    userEmail: string;
}

export function DeleteAccountDialog({ userEmail }: DeleteAccountDialogProps) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<DeleteAccountFormData>({
        resolver: zodResolver(deleteAccountSchema),
    });

    const confirmationValue = watch('confirmation');
    const isConfirmationValid =
        confirmationValue === 'DELETE' || confirmationValue === userEmail;

    const onSubmit = async (data: DeleteAccountFormData) => {
        const trimmedConfirmation = data.confirmation.trim();
        const isValid = trimmedConfirmation === 'DELETE' || trimmedConfirmation === userEmail;

        if (!isValid) {
            toast({
                title: 'Invalid confirmation',
                description: 'Please type DELETE or your email to confirm.',
                variant: 'destructive',
            });
            return;
        }

        setIsDeleting(true);

        try {
            const result = await deleteAccount(trimmedConfirmation);

            if (result.error) {
                toast({
                    title: 'Deletion failed',
                    description: result.error,
                    variant: 'destructive',
                });
                setIsDeleting(false);
                return;
            }

            // Success - handle client-side signout to avoid race conditions
            if (result.success && result.shouldSignOut) {
                const supabase = createClient();
                await supabase.auth.signOut();

                toast({
                    title: 'Account deleted',
                    description: 'Your account has been permanently deleted.',
                });

                router.push('/account-deleted');
            }
        } catch (error) {
            toast({
                title: 'Unexpected error',
                description: 'An error occurred while deleting your account. Please try again.',
                variant: 'destructive',
            });
            setIsDeleting(false);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!isDeleting) {
            setOpen(newOpen);
            if (!newOpen) {
                reset();
            }
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="confirmation">
                            Type <span className="font-bold">DELETE</span> or your email (
                            <span className="font-mono text-sm">{userEmail}</span>) to confirm:
                        </Label>
                        <Input
                            id="confirmation"
                            {...register('confirmation')}
                            placeholder="DELETE"
                            disabled={isDeleting}
                            aria-invalid={errors.confirmation ? 'true' : 'false'}
                            aria-describedby={errors.confirmation ? 'confirmation-error' : undefined}
                        />
                        {errors.confirmation && (
                            <p id="confirmation-error" className="text-sm text-red-600">
                                {errors.confirmation.message}
                            </p>
                        )}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={!isConfirmationValid || isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Account'}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
