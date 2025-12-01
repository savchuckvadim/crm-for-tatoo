'use client'
import Link from "next/link";
// import { supaAuth } from "@/modules/services/db/supabase/model";
import Image from "next/image";

// bg-gray-800 text-white 
export default function AuthHeader() {
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
                href="/crm/start"
                className="text-accent-foreground hover:text-secondary transition-colors dark:hover:text-primary"
            >
                Business
            </Link>
            {/* <Link
                href="/"
                className="text-accent-foreground hover:text-secondary transition-colors dark:hover:text-primary"
                onClick={() => signOut()}
            >
                Выйти
            </Link> */}

        </nav>
    );
}
