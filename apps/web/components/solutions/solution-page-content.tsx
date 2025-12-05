'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { SimpleButton, SimpleCard } from '@workspace/ui';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@workspace/shadcn-components/lib/utils';

interface SolutionPageContentProps {
    locale: string;
    slug: string;
}

export function SolutionPageContent({ locale, slug }: SolutionPageContentProps) {
    const t = useTranslations(`solutions.${slug}`);
    const currentLocale = useLocale();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-black tracking-tight md:text-5xl lg:text-6xl mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-4">
                            {t('subtitle')}
                        </p>
                        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
                            {t('description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={`/${currentLocale}/auth/register`}>
                                <SimpleButton variant="primary" size="lg">
                                    {t('cta.button')}
                                </SimpleButton>
                            </Link>
                            <Link href={`/${currentLocale}/contact`}>
                                <SimpleButton variant="outline" size="lg">
                                    Contact Sales
                                </SimpleButton>
                            </Link>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                            {t('cta.description')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            {t('features.title')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {t.raw('features.items').map((feature: any, index: number) => (
                                <SimpleCard key={index} className="h-full">
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </div>
                                </SimpleCard>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            {t('benefits.title')}
                        </h2>
                        <ul className="space-y-4">
                            {t.raw('benefits.items').map((benefit: string, index: number) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1">
                                        <Check className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="text-lg">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            {t('cta.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            {t('cta.description')}
                        </p>
                        <Link href={`/${currentLocale}/auth/register`}>
                            <SimpleButton variant="primary" size="lg" className="w-full sm:w-auto">
                                {t('cta.button')}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </SimpleButton>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

