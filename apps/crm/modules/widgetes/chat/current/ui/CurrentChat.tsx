import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Chat } from '@/modules/entities'
import { ArrowLeft, CircleCheck } from 'lucide-react'
import React from 'react'



// interface ChatPageProps {
//     chatId: number

// }
export default function CurrentChat({ chatId }: { chatId: number }) {
    console.log('CurrentChat', chatId)
    return (
        <div className='h-[calc(100vh-100px)] w-full bg-white rounded-3xl p-3'>
            <div className='h-[49px] border-b border-gray-300 p-3 flex items-center justify-between'>
               <div className='min-w-full flex flex-row items-center justify-between'>

               
                <div className='flex flex-row py-3 items-center gap-2'>
                    <ArrowLeft />
                    <Avatar>
                        <AvatarImage src="/profile-hero-test.jpg" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2>Имя</h2>
                        <p>Статус</p>
                    </div>
                </div>

                <div>
                    <Badge className='bg-primary cursor-pointer'>
                        secret
                    </Badge>
                </div>
                </div>
            </div>
            <div className='h-[calc(100vh-150px)]'>
                <Chat />
            </div>

        </div>
    )
}
