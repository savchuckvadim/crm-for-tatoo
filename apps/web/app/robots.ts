import { SITE_CONFIG } from '@/lib/constants';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/crm',
                    '/dashboard',
                    '/portal/*',
                    '/_next/',
                    '/book', // Registration/login pages can be noindexed if needed
                ],
            },
        ],
        sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    };
}

