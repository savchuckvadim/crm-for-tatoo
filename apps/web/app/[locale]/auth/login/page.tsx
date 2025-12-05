'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { SimpleButton } from '@workspace/ui';
import { Brand } from '@/components/brand/Brand';

export default function LoginPage() {
    const t = useTranslations('auth.login');
    const locale = useLocale();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // This would send to API in real implementation
        console.log('Login submitted:', formData);
        // Redirect to dashboard or home
        window.location.href = `/${locale}/dashboard`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Brand size="lg" className="justify-center mb-4" />
                    <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                    <p className="text-muted-foreground">{t('subtitle')}</p>
                </div>

                <div className="bg-card rounded-lg border p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">
                                {t('email')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">
                                {t('password')}
                            </label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm">{t('remember')}</span>
                            </label>
                            <Link
                                href={`/${locale}/forgot-password`}
                                className="text-sm text-primary hover:underline"
                            >
                                {t('forgotPassword')}
                            </Link>
                        </div>

                        <SimpleButton type="submit" variant="primary" size="lg" className="w-full">
                            {t('submit')}
                        </SimpleButton>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            {t('noAccount')}{' '}
                            <Link href={`/${locale}/auth/register`} className="text-primary hover:underline font-medium">
                                {t('signUp')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

