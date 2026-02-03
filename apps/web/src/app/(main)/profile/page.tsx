import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProfileForm } from "@/components/features/profile/profile-form"

export default async function ProfilePage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single()

    return (
        <div className="container mx-auto px-4 max-w-2xl py-10">
            <ProfileForm user={user} initialData={profile} />
        </div>
    )
}
