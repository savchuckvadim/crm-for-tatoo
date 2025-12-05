'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { SimpleButton } from '@workspace/ui';
import { ThemeToggler } from '@workspace/theme';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { Brand } from '../brand/Brand';
import { cn } from '@workspace/shadcn-components/lib/utils';

export function Header() {
    const t = useTranslations('navigation');
    const locale = useLocale();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: `/${locale}#features`, label: t('features') },
        // { href: `/${locale}#pricing`, label: t('pricing') },
        { href: `/${locale}/solutions/tattoo-artists`, label: t('solutions') },
        { href: `/${locale}/blog`, label: t('blog') },
        { href: `/${locale}/contact`, label: t('contacts') },
    ];

    return (
        <header className="absolute top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 max-w-[1600px] mx-auto">
                {/* Logo */}
                <Link href={`/${locale}`} className="flex items-center space-x-2 flex-shrink-0">
                    <Brand size="md" showTagline={false} logoPosition="left" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-3">
                    <LanguageSwitcher />
                    <ThemeToggler />
                    <Link href={`/${locale}/auth/login`}>
                        <SimpleButton variant="ghost" size="sm">
                            {t('login')}
                        </SimpleButton>
                    </Link>
                    <Link href={`/${locale}/auth/register`}>
                        <SimpleButton variant="primary" size="sm">
                            {t('getStarted')}
                        </SimpleButton>
                    </Link>
                </div>

                {/* Mobile Actions */}
                <div className="flex md:hidden items-center space-x-2">
                    <LanguageSwitcher />
                    <ThemeToggler />
                    <button
                        type="button"
                        className="p-2 rounded-md text-foreground hover:bg-muted transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out overflow-hidden',
                    mobileMenuOpen ? 'h-screen opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <nav className="container px-4 py-4 space-y-3 max-w-[1600px] mx-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block py-2 text-base font-medium transition-colors hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-4 border-t space-y-3">
                        <Link
                            href={`/${locale}/auth/login`}
                            className="block w-full"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <SimpleButton variant="ghost" size="sm" className="w-full justify-center">
                                {t('login')}
                            </SimpleButton>
                        </Link>
                        <Link
                            href={`/${locale}/auth/register`}
                            className="block w-full"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <SimpleButton variant="primary" size="sm" className="w-full justify-center">
                                {t('getStarted')}
                            </SimpleButton>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

