import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { locales } from '@/i18n';

export interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    locale?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    noindex?: boolean;
}

/**
 * Generate comprehensive metadata for SEO
 */
export function generateMetadata({
    title,
    description,
    keywords = [],
    image,
    url,
    locale = 'ru',
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    noindex = false,
}: SEOProps): Metadata {
    const fullTitle = `${title} | ${SITE_CONFIG.name}`;
    const fullUrl = url || SITE_CONFIG.url;
    const ogImage = image || `${SITE_CONFIG.url}/og-image.jpg`;

    // Generate alternate language URLs
    const alternates: Metadata['alternates'] = {
        canonical: fullUrl,
        languages: Object.fromEntries(
            locales.map((loc) => [
                loc,
                fullUrl.replace(`/${locale}`, `/${loc}`) || `${SITE_CONFIG.url}/${loc}`,
            ])
        ),
    };

    return {
        title: fullTitle,
        description,
        keywords: keywords.length > 0 ? keywords : undefined,
        authors: author ? [{ name: author }] : [{ name: SITE_CONFIG.name }],
        creator: SITE_CONFIG.name,
        publisher: SITE_CONFIG.name,
        robots: noindex
            ? {
                index: false,
                follow: false,
            }
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
        openGraph: {
            type,
            locale:
                locale === 'ru'
                    ? 'ru_RU'
                    : locale === 'en'
                        ? 'en_US'
                        : locale === 'es'
                            ? 'es_ES'
                            : locale === 'de'
                                ? 'de_DE'
                                : locale === 'fr'
                                    ? 'fr_FR'
                                    : locale === 'nl'
                                        ? 'nl_NL'
                                        : locale === 'sv'
                                            ? 'sv_SE'
                                            : locale === 'fi'
                                                ? 'fi_FI'
                                                : locale === 'uk'
                                                    ? 'uk_UA'
                                                    : 'en_US',
            url: fullUrl,
            title: fullTitle,
            description,
            siteName: SITE_CONFIG.name,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            ...(type === 'article' && {
                publishedTime,
                modifiedTime,
                authors: author ? [author] : undefined,
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [ogImage],
        },
        alternates,
    };
}

