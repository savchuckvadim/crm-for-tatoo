'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SimpleButton } from '@workspace/ui';
import SplashCursor from '@workspace/shadcn-components/components/SplashCursor';

export function Hero() {
    const t = useTranslations('home.hero');
    const locale = useLocale();

    return (
        <section className="relative flex h-screen min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex-col items-center justify-center px-4 py-20 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                {/* <Image
                    src="/home/hero_1.avif"
                    alt={t('title')}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                /> */}
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
                        {t('description')}
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={`/${locale}/book`}>
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

