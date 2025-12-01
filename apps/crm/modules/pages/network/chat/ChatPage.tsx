import React from 'react'

import { CurrentChat } from '@/modules/widgetes'

export default function ChatPage({ chatId }: { chatId: string }) {
    return (
        <div className='h-screen w-full py-4'>
          
            <CurrentChat chatId={Number(chatId)} />
        </div>
    )
}
