'use client';

import { Calendar, Users, DollarSign, Mail, BarChart3, Sparkles } from 'lucide-react';
import { SimpleCard } from '@workspace/ui';
import { useTranslations } from 'next-intl';

const featureKeys = [
    'appointments',
    'clients',
    'finance',
    'marketing',
    'analytics',
    'seo',
] as const;

const featureIcons = {
    appointments: Calendar,
    clients: Users,
    finance: DollarSign,
    marketing: Mail,
    analytics: BarChart3,
    seo: Sparkles,
};

export function Features() {
    const t = useTranslations('home.features');

    return (
        <section id="features" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        {t('title')}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {featureKeys.map((key) => {
                        const Icon = featureIcons[key];
                        return (
                            <SimpleCard
                                key={key}
                                className="h-full"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{t(`items.${key}.title`)}</h3>
                                    <p className="text-muted-foreground">{t(`items.${key}.description`)}</p>
                                </div>
                            </SimpleCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

