'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { SimpleButton } from '@workspace/ui';
import { ThemeToggler } from '@workspace/theme';
import { LanguageSwitcher } from '@/components/layout/language-switcher';

export function Header() {
    const t = useTranslations('navigation');
    const locale = useLocale();

    return (
        <header className="absolute top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 max-w-[1600px] mx-auto">
                <Link href={`/${locale}`} className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">Tattoo CRM</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link href={`/${locale}#features`} className="text-sm font-medium transition-colors hover:text-primary">
                        {t('features')}
                    </Link>
                    <Link href={`/${locale}#pricing`} className="text-sm font-medium transition-colors hover:text-primary">
                        {t('pricing')}
                    </Link>
                    <Link href={`/${locale}/blog`} className="text-sm font-medium transition-colors hover:text-primary">
                        {t('blog')}
                    </Link>
                    <Link href={`/${locale}/contact`} className="text-sm font-medium transition-colors hover:text-primary">
                        {t('contacts')}
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <LanguageSwitcher />
                    <ThemeToggler />
                    <Link href={`/${locale}/book`}>
                        <SimpleButton variant="ghost" size="sm">
                            {t('login')}
                        </SimpleButton>
                    </Link>
                    <Link href={`/${locale}/book`}>
                        <SimpleButton variant="primary" size="sm">
                            {t('getStarted')}
                        </SimpleButton>
                    </Link>
                </div>
            </div>
        </header>
    );
}

