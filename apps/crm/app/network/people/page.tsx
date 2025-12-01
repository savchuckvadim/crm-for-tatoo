// import Image from "next/image";

import Image from "next/image";




export default async function ProfilePage() {

  return (


    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    <div className="relative flex flex-col items-center justify-start min-w-screen min-h-screen">

      {/* <Hero image={orderedImages[0]} />
       */}
      <Image
        src="/logo.svg"
        alt="Logo"
        width={120}
        height={85}
        className="backgound:invert"
        priority
      />
      People Sociopath.
    </div>
    //   </main>

    // </div>
  );
}
