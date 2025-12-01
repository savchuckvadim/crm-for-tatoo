'use client'
import { Post, ProfileInformation } from '@/modules/widgetes'
import React from 'react'
export default function Profile() {
    return (
        <div className='p-5 w-full flex flex-col gap-4'>
            <ProfileInformation />
            <div className='mt-10'>
                <Post />
                <Post />
                <Post />
            </div>

        </div>
    )
}
