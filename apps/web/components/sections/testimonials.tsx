'use client';

import { SimpleCard } from '@workspace/ui';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const avatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCYCSVUexy3hgQiUevoL5nD-KJg0GGDyaiu62FSDf4HJCZNNUObK8-jyL4EbY79EvaFN968f6_Q-IPOIOUVHYS8N1dCZUkWMoL60fvFnkpOxsf743Ho09psUDmA9H3YFtr0D5AOc4ybzXbnibzdvEZeOLmGLrtUJ-ZQuSpqRHD1AMAflOTezLF6CEcE1JjmKD4JRW1j2kp4SiFk2KOY9puYmh-hPsVKykTwWfkoQRARWgxjd6ag59uRMu4zsgBZC4gME5WkMUMba5A',
    'https://ui-avatars.com/api/?name=Dmitry+Sokolov&background=EA2831&color=fff',
    'https://ui-avatars.com/api/?name=Maria+Petrova&background=EA2831&color=fff',
];

export function Testimonials() {
    const t = useTranslations('home.testimonials');

    const testimonials = t.raw('items') as Array<{
        name: string;
        role: string;
        content: string;
    }>;

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        {t('title')}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <SimpleCard key={index} className="h-full">
                            <div className="flex flex-col gap-4">
                                <p className="text-muted-foreground italic">&quot;{testimonial.content}&quot;</p>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={avatars[index] || avatars[0] || ''}
                                        alt={testimonial.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </SimpleCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

