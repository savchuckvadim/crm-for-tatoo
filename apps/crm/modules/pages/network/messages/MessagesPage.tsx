import React from 'react'
import { ChatPreview } from '@/modules/widgetes'
const chats = [
  {
    id: 1,
    message: "Hello, how are you?",
    sender: "John Doe",
    receiver: "Jane Doe",
    createdAt: "2021-01-01",
    read: true,
    type: "text",
    lastMessage: "hey yo!",
    status: "sent",
    isRead: true,
    isSender: true,
    isReceiver: false,
   
  },
  {
    id: 2,
    message: "Hello, how are you?",
    sender: "Иван Иванов",
    receiver: "Петр Петров",
    createdAt: "2021-01-01",
    type: "text",
    lastMessage: "Hello, how are you?",
    status: "sent",
    isRead: true,
    isSender: true,
    isReceiver: false,
  },
  {
    id: 3,
    message: "Hello, how are you?",
    sender: "Калинин Александр",
    receiver: "Сергей Сергеев",
    createdAt: "2021-01-01",
    type: "text",
    lastMessage: "give me a sociopath content, man",
    status: "sent",
    isRead: true,
    isSender: true,
    isReceiver: false,
  },
]

export default function MessagesPage() {
  return (
    
    <div className='p-2'>
        <h1 className='text-2xl font-bold'>Messages</h1>
        <div className='flex flex-col gap-3'>
          {chats.map(cht => <ChatPreview key={`chat-preview-${cht.id}`} chatId={cht.id} lastMessage={cht.lastMessage} />)}
   
        </div>
       
    </div>
  )
}
