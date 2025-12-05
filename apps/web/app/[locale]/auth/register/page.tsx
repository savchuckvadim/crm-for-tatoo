'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { SimpleButton } from '@workspace/ui';
import { Brand } from '@/components/brand/Brand';

export default function RegisterPage() {
    const t = useTranslations('auth.register');
    const locale = useLocale();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (!formData.agree) {
            alert('Please agree to the terms and privacy policy');
            return;
        }

        // This would send to API in real implementation
        console.log('Register submitted:', formData);
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
                            <label htmlFor="name" className="block mb-2 text-sm font-medium">
                                {t('name')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="John Doe"
                            />
                        </div>

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
                                minLength={8}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">
                                {t('confirmPassword')}
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="••••••••"
                                minLength={8}
                            />
                        </div>

                        <div>
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.agree}
                                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                                    className="mt-1 rounded border-gray-300"
                                    required
                                />
                                <span className="text-sm text-muted-foreground">
                                    {t('agree')}{' '}
                                    <Link href={`/${locale}/terms`} className="text-primary hover:underline">
                                        {t('terms')}
                                    </Link>{' '}
                                    {t('and')}{' '}
                                    <Link href={`/${locale}/privacy`} className="text-primary hover:underline">
                                        {t('privacy')}
                                    </Link>
                                </span>
                            </label>
                        </div>

                        <SimpleButton type="submit" variant="primary" size="lg" className="w-full">
                            {t('submit')}
                        </SimpleButton>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            {t('hasAccount')}{' '}
                            <Link href={`/${locale}/auth/login`} className="text-primary hover:underline font-medium">
                                {t('signIn')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

