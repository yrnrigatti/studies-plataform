"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { type User } from "@supabase/supabase-js"

import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/card"
import { useToast } from "@repo/ui/use-toast"

import { createClient } from "@/lib/supabase/client"
import { profileSchema, type ProfileFormValues } from "@/lib/schemas/user"

interface ProfileData {
    name: string | null
}

interface ProfileFormProps {
    user: User
    initialData?: ProfileData
}

export function ProfileForm({ user, initialData }: ProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()
    const { toast } = useToast()

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: user.email || "",
            displayName: initialData?.name || user.user_metadata?.full_name || "",
        },
    })

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)

        try {
            const { error } = await supabase
                .from('users')
                .update({ name: data.displayName })
                .eq('id', user.id)

            if (error) {
                toast({
                    variant: "destructive",
                    title: "Error updating profile",
                    description: error.message,
                })
                return
            }

            toast({
                title: "Profile updated",
                description: "Your profile has been successfully updated.",
            })

            router.refresh()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Please try again later.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    Manage your public profile information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
