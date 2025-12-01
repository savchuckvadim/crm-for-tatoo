import { locales, defaultLocale } from '@/i18n';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { notFound, redirect } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import {
    generateOrganizationSchema,
    generateProductSchema,
} from '@/lib/seo/schema';

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!locale || !locales.includes(locale as (typeof locales)[number])) {
        notFound();
    }

    let messages;

    try {
        // Загружаем сообщения по модулям
        const [common, navigation, home, footer] = await Promise.all([
            import(`@/messages/${locale}.json`).then((m) => m.default).catch(() => ({ common: { brand: { title: 'Tattoo CRM', description: '' } } })),
            import(`@/messages/navigation/${locale}.json`).then((m) => m.default).catch(() => ({})),
            import(`@/messages/home/${locale}.json`).then((m) => m.default).catch(() => ({})),
            import(`@/messages/footer/${locale}.json`).then((m) => m.default).catch(() => ({})),
        ]);

        messages = {
            common,
            navigation,
            home,
            footer,
        };
    } catch (error) {
        console.error('Error loading messages:', error);
        // Fallback на дефолтную локаль при ошибке
        if (locale !== defaultLocale) {
            redirect(`/${defaultLocale}`);
        }
        notFound();
    }

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <JsonLd data={generateOrganizationSchema()} />
            <JsonLd data={generateProductSchema()} />
            <ThemeProvider>
                <div className="flex min-h-screen flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </ThemeProvider>
        </NextIntlClientProvider>
    );
}

