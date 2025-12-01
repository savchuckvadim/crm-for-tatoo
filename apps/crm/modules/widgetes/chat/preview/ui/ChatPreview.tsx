import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import React from 'react'

interface ChatPreviewProps {
    chatId: number
    lastMessage: string
}

export default function ChatPreview({ chatId, lastMessage }: ChatPreviewProps) {
    return (
        <Link
            href={`/network/chat/${chatId}`}
        >
            <div className='w-full bg-white  flex items-center  rounded-3xl p-3'>
                <div className='w-full flex items-center gap-2 h-20'>
                    <div className='w-[8%]'>
                        <Avatar className='w-20 h-20'>
                            <AvatarImage src="/profile-hero-test.jpg" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='w-[85%] h-full flex flex-col items-start px-1'>
                        <p className='font-bold'>John Doe</p>
                        <p>{lastMessage}</p>

                    </div>

                    <div className='w-[5%] min-h-full flex flex-col items-end justify-between'>
                        <p>12:00</p>
                        <span className='w-4 h-4 flex items-center justify-center bg-primary rounded-full'>
                            <p className='text-white text-xs'>1</p>
                        </span>
                    </div>
                </div>
            </div>
        </Link  >
    )
}
