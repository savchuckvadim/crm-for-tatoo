import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';
import { SolutionPageContent } from '@/components/solutions/solution-page-content';
import { getTranslations } from 'next-intl/server';

const solutionSlugs = ['tattoo-artists', 'studio-owners', 'freelancers', 'multi-location-studios'] as const;

export async function generateStaticParams() {
    return solutionSlugs.map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;

    if (!solutionSlugs.includes(slug as any)) {
        return {};
    }

    const t = await getTranslations({ locale, namespace: `solutions.${slug}` });

    return generateSEOMetadata({
        title: t('title'),
        description: t('description'),
        url: `${SITE_CONFIG.url}/${locale}/solutions/${slug}`,
        locale,
        keywords: [
            'tattoo studio CRM',
            'tattoo booking software',
            slug,
            locale === 'ru' ? 'CRM для тату салона' : 'tattoo CRM',
        ],
    });
}

export default async function SolutionPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;

    if (!solutionSlugs.includes(slug as any)) {
        notFound();
    }

    return <SolutionPageContent locale={locale} slug={slug} />;
}

