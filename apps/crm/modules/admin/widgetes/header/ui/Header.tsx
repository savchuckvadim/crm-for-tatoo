'use client'
// import { supaAuth } from "@/modules/services/db/supabase/model";
import NetworkHeader from "./NetworkHeader";
import AuthHeader from "./AuthHeader";
import Image from "next/image";
import Link from "next/link";

// bg-gray-800 text-white 
export default function Header({ type }: { type: 'auth' | 'network' }) {
    const signOut = () => {
        // supaAuth.logout();

    }
    return (
        <header className="w-full 
       bg-background text-primary-foreground 
        py-4 shadow-0
        h-[56px]
       flex items-center
       p-3
        "

        >
            {/* <div className="container mx-auto flex items-center justify-between px-4 bg-background"> */}
            <div className="container max-w-6xl mx-auto p-0 px-6 sm:px-0  flex items-center justify-between">

                <div className="flex items-center gap-2     ">
                    <Link href="/start">
                        <Image
                            src="/brand.svg"
                            alt="Logo"
                            width={140}
                            height={40}
                            className="dark:invert"

                        />
                    </Link>

                </div>
                {type === 'auth' ? <AuthHeader /> : <NetworkHeader />}
            </div>
        </header>
    );
}
