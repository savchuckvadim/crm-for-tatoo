import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import React from 'react'

interface AuthInputProps {
    label: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
}
export default function AuthInput({ label, type, placeholder, onChange, id }: AuthInputProps) {
    return (
        <div className="grid gap-2">
            {/* <Label htmlFor={id}>{label}</Label> */}
            <Input
                className='h-[50px] '
                id={id}
                type={type}
                placeholder={label}
                required
                onChange={onChange}

            />
        </div>
    )
}
