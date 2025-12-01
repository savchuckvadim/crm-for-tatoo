//
import { ChatPage as ChatPageComponent } from "@/modules/pages";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ChatPageComponent chatId={resolvedParams.id} />;
}


//  app/network/chat/[id]/page.tsx

// import { ChatPage as ChatPageComponent } from "@/modules/pages";

// export const dynamic = "force-dynamic"; // 💥
// interface ChatPageProps {
//   params: {
//     id: string;
//   };
// }

// export default async function ChatPage({ params }: ChatPageProps) {
//   const { id } =  params;

//   return <ChatPageComponent chatId={id} />;
// }




// .....
// import { ChatPage as ChatPageComponent } from "@/modules/pages";

// export default async function ChatPage(props: Promise<{ params: { id: string } }>) {
//   const params = (await props).params;
//   const id = params.id as string;

//   return <ChatPageComponent chatId={id} />;
// }