'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ConfirmForm() {
    const [message, setMessage] = useState('Подтверждение...');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const confirmEmail = async () => {
           
        };

        confirmEmail();
    }, [searchParams, router]);

    return (
        <h1>{message}</h1>

    );
}
