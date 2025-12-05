
import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { Testimonials } from '@/components/sections/testimonials';
import { CTA } from '@/components/sections/cta';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/lib/constants';
import { locales } from '@/i18n';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await import(`@/messages/home/${locale}.json`).then(
        (m) => m.default.hero
    );

    return generateSEOMetadata({
        title: t.title,
        description: t.description,
        keywords: [
            'tattoo studio CRM',
            'tattoo booking software',
            'tattoo client management',
            'tattoo appointment system',
            'CRM для тату салона',
            'управление тату студией',
            'запись на татуировку онлайн',
        ],
        url: `${SITE_CONFIG.url}/${locale}`,
        locale,
        image: `${SITE_CONFIG.url}/og-home-${locale}.jpg`,
    });
}

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <Testimonials />
            <CTA />
        </>
    );
}

