'use client'
import Link from "next/link";
import { ThemeMode } from "@/modules/features";
// import { supaAuth } from "@/modules/services/db/supabase/model";

// bg-gray-800 text-white 
export default function NetworkHeader() {
    const signOut = () => {
        // supaAuth.logout();

    }
    return (
        <nav className="flex gap-4">
            {/* <Link
                href="/admin/home"
                className="text-accent-foreground hover:text-secondary transition-colors"
            >
                Home
            </Link>
            <Link
                href="/admin/services"
                className="text-accent-foreground hover:text-secondary transition-colors"
            >
                Services
            </Link> */}
            <Link
                href="/admin/projects"
                className="text-accent-foreground hover:text-secondary transition-colors dark:hover:text-primary"
            >
                User
            </Link>
            <Link
                href="/"
                className="text-accent-foreground hover:text-secondary transition-colors dark:hover:text-primary"
                onClick={() => signOut()}
            >
                Logout
            </Link>
            {/* <ThemeMode /> */}
        </nav>
    );
}
