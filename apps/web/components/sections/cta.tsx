'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { SimpleButton } from '@workspace/ui';

export function CTA() {
    const t = useTranslations('home.cta');
    const locale = useLocale();

    return (
        <section className="py-20 bg-primary/10">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        {t('title')}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {t('description')}
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={`/${locale}/book`}>
                            <SimpleButton variant="primary" size="lg" className="w-full sm:w-auto">
                                {t('register')}
                            </SimpleButton>
                        </Link>
                        <Link href={`/${locale}/contact`}>
                            <SimpleButton variant="outline" size="lg" className="w-full sm:w-auto">
                                {t('contact')}
                            </SimpleButton>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

