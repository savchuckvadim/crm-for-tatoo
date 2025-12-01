import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
    localeDetection: true,
});

export async function middleware(req: NextRequest) {
    // Handle internationalization first
    const response = intlMiddleware(req);

    return response;
}

export const config = {
    matcher: [
        // Match all pathnames except for
        // - api routes
        // - static files (e.g. favicon.ico, robots.txt)
        // - static media files (e.g. images, fonts)
        // - _next internal routes
        '/((?!api|_next|.*\\..*).*)',
        // Also match the root path
        '/',
        '/(ru|en|es|de|fr|nl|sv|fi|uk)/:path*',
    ],
};

