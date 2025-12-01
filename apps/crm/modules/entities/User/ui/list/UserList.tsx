'use client'
import React from 'react'
import { useUsers } from '../../lib/useUsers'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function UserList() {

    const { users, isLoading, error, } = useUsers()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    // if (!isFetched) return <div>Not fetched</div>


    return (
        <div className='flex flex-col gap-4 min-h-full min-w-full'>
            {users && users.map((user) => (
                <Card key={user.id} className='w-36'>
                    <CardHeader>
                        <CardTitle>{user.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{user.email}</CardDescription>

                    </CardContent>
                    <CardFooter className='flex justify-center align-center'>
                        <Button>Follow</Button>

                    </CardFooter>
                </Card>
                // <div key={user.id}>{user.name}</div>
            ))}
        </div>

    )
}
