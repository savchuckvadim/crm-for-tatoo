import { SITE_CONFIG } from '@/lib/constants';
import { locales } from '@/i18n';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];

    const pages = ['', '/blog', '/contact', '/artists'];
    const solutions = [
        '/solutions/tattoo-artists',
        '/solutions/studio-owners',
        '/solutions/freelancers',
        '/solutions/multi-location-studios',
    ];
    const comparisons = ['/vs/squarespace-booking', '/vs/fresha', '/vs/vagaro'];

    locales.forEach((locale) => {
        // Main pages
        pages.forEach((page) => {
            routes.push({
                url: `${SITE_CONFIG.url}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: page === '' ? 1 : 0.8,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map((loc) => [loc, `${SITE_CONFIG.url}/${loc}${page}`])
                    ),
                },
            });
        });

        // Solution landing pages
        solutions.forEach((solution) => {
            routes.push({
                url: `${SITE_CONFIG.url}/${locale}${solution}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map((loc) => [
                            loc,
                            `${SITE_CONFIG.url}/${loc}${solution}`,
                        ])
                    ),
                },
            });
        });

        // Comparison pages
        comparisons.forEach((comparison) => {
            routes.push({
                url: `${SITE_CONFIG.url}/${locale}${comparison}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.85,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map((loc) => [
                            loc,
                            `${SITE_CONFIG.url}/${loc}${comparison}`,
                        ])
                    ),
                },
            });
        });
    });

    return routes;
}

