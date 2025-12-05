import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { SEO_DEFAULT, SITE_CONFIG } from '@/lib/constants';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import '@/app/globals.css';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-display',
    display: 'optional',
});

export const metadata: Metadata = {
    title: {
        default: SEO_DEFAULT.title,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SEO_DEFAULT.description,
    keywords: SEO_DEFAULT.keywords,
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
    },
    openGraph: {
        type: 'website',
        locale: 'ru_RU',
        url: SITE_CONFIG.url,
        title: SEO_DEFAULT.title,
        description: SEO_DEFAULT.description,
        siteName: SITE_CONFIG.name,
    },
    twitter: {
        card: 'summary_large_image',
        title: SEO_DEFAULT.title,
        description: SEO_DEFAULT.description,
    },
    robots: {
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
    verification: {
        // Добавьте коды верификации для поисковых систем
        // google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
        // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning>
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
                    rel="stylesheet"
                />
            </head>
            <body className={`${spaceGrotesk.variable} font-display`}>
                <GoogleAnalytics
                    measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
                />
                {children}
            </body>
        </html>
    );
}

