import { Header } from "@/modules/admin/widgetes/header";
import LoadingScreen from "@/modules/shared/LoadingScreen/ui/LoadingScreen";
import "@/styles/globals.css";
import { Metadata } from "next";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Sociopath authentication",
  description: "Sociopath authentication",
};

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}) {
  const param = await params
  // const isAuthSubPage = pathname.split('/auth/')[1]?.length > 0;
  // console.log(isAuthSubPage)
  console.log(param)
  return (
    <>
      <Header type="auth" />
      <div className={`relative h-screen w-full flex items-center justify-center bg-background`}>
        {/* Фоновая картинка */}
        <Image
          className="absolute inset-0 z-0 object-contain opacity-10"
          src="/grey-logo.svg"
          alt="Logo"
          fill
        />
        <LoadingScreen />

        <div className="relative z-10 w-full">
          {children}
        </div>

        <div className="absolute bottom-3 flex flex-row justify-center items-center gap-3 w-full">
          <p className="text-md text-neutral-500">© 2025 Sociopath. All rights reserved.</p>
        </div>
      </div>
    </>

  );
}

