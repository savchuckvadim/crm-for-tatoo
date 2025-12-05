'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import { SimpleButton } from '@workspace/ui';

// Динамический импорт SplashCursor для избежания проблем с SSR
const SplashCursor = dynamic(
    () => import('@workspace/shadcn-components/components/SplashCursor').then((mod) => ({ default: mod.default || mod })),
    {
        ssr: false,
        loading: () => null,
    }
);

export function Hero() {
    const t = useTranslations('home.hero');
    const locale = useLocale();

    return (
        <section className="relative flex h-screen min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex-col items-center justify-center px-4 py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <SplashCursor />
                {/* Overlay для читаемости текста */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
                <div className="absolute inset-0 bg-background/40" />
            </div>

            {/* Content */}
            <div className="container mx-auto relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl">
                        {t('title')}
                        <br />
                        <span className="text-primary">{t('titleHighlight')}</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/90 md:text-xl">
                        {t('tagline')}
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={`/${locale}/auth/register`}>
                            <SimpleButton variant="primary" size="lg" className="w-full sm:w-auto">
                                {t('ctaPrimary')}
                            </SimpleButton>
                        </Link>
                        <Link href={`/${locale}#features`}>
                            <SimpleButton variant="outline" size="lg" className="w-full sm:w-auto">
                                {t('ctaSecondary')}
                            </SimpleButton>
                        </Link>
                    </div>
                    <p className="mt-4 text-sm text-foreground/80">
                        {t('noCreditCard')}
                    </p>
                </div>
            </div>
        </section>
    );
}

