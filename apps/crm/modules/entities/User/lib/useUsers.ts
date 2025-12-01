"use client"

import { useEffect } from "react"
import { useState } from "react"
import { getUsersNest, createUserNest, updateUserNest, deleteUserNest } from "./helper"
import { User } from "@crm/prisma"

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const data = await getUsersNest()
            debugger
            setUsers(data)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch users'))
        } finally {
            setIsLoading(false)
        }
    }

    const addUser = async (userData: Partial<User>) => {
        try {
            setIsLoading(true)
            const newUser = await createUserNest(userData)
            setUsers(prev => [...prev, newUser])
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to create user'))
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const editUser = async (id: string, userData: Partial<User>) => {
        try {
            setIsLoading(true)
            const updatedUser = await updateUserNest(id, userData)
            setUsers(prev => prev.map(user =>
                user.id === Number(id) ? updatedUser : user
            ))
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to update user'))
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const removeUser = async (id: string) => {
        try {
            setIsLoading(true)
            await deleteUserNest(id)
            setUsers(prev => prev.filter(user => user.id !== Number(id)))
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to delete user'))
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return {
        users,
        isLoading,
        error,
        addUser,
        editUser,
        removeUser,
        refetch: fetchUsers
    }
}

