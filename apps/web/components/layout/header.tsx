import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

import { Button } from "@repo/ui/button"
import { UserNav } from "./user-nav"

export async function Header() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <header className="border-b">
            <div className="flex h-16 items-center px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold md:px-2">
                    Study Platform
                </Link>
                <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                    {user ? (
                        <UserNav />
                    ) : (
                        <div className="flex gap-4">
                            <Link href="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}
