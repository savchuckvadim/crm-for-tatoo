import { EModelName } from "@/app/api/type/model"
import { User } from "@crm/prisma"

// Хелпер для работы с Next.js API (относительные пути)
async function fetchNextAPI<T>(endpoint: string, options: RequestInit = {}) {
    const { body, ...restOptions } = options

    const response = await fetch(endpoint, {
        ...restOptions,
        headers: {
            'Content-Type': 'application/json',
            ...restOptions.headers,
        },
        ...(body && { body: JSON.stringify(body) }),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }))
        throw new Error(error.message || 'Failed to fetch')
    }

    const data = await response.json() as IResponse<T>
    return data.result
}

// Хелпер для работы с NestJS API (абсолютные пути)
const NEST_API_URL = process.env.NEXT_PUBLIC_NEST_API_URL || 'http://localhost:5000'
export enum EResultCode {
    SUCCESS = 0,
    ERROR = 1,
}
interface IResponse<T> {
    resultCode: EResultCode
    result: T
}
async function fetchNestAPI<T>(endpoint: string, options: RequestInit = {}) {
    const { body, ...restOptions } = options

    const response = await fetch(`${NEST_API_URL}${endpoint}`, {
        ...restOptions,
        headers: {
            'Content-Type': 'application/json',
            ...restOptions.headers,
        },
        ...(body && { body: JSON.stringify(body) }),

    }) as Response
    debugger
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }))
        throw new Error(error.message || 'Failed to fetch')
    }
    const data = await response.json() as IResponse<T>
    return data.result
}

// Next.js API методы
export const getUsersNext = async () => {
    return fetchNextAPI<User[]>(`/api/${EModelName.USERS}`)
}

export const createUserNext = async (data?: any) => {
    return fetchNextAPI<User>(`/api/${EModelName.USERS}`, {
        method: 'POST',
        body: data,
    })
}

// NestJS API методы
export const getUsersNest = async () => {
    return fetchNestAPI<User[]>(`/api/${EModelName.USERS}`)
}

export const createUserNest = async (data: any) => {
    return fetchNestAPI<User>(`/api/${EModelName.USERS}`, {
        method: 'POST',
        body: data,
    })
}

export const updateUserNest = async (id: string, data: any) => {
    return fetchNestAPI<User>(`/api/${EModelName.USERS}/${id}`, {
        method: 'PUT',
        body: data,
    })
}

export const deleteUserNest = async (id: string) => {
    return fetchNestAPI<{ userId: number }>(`/api/${EModelName.USERS}/${id}`, {
        method: 'DELETE',
    })
}
