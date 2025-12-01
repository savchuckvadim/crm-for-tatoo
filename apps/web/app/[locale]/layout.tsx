import { locales } from '@/i18n';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import {
    generateOrganizationSchema,
    generateProductSchema,
} from '@/lib/seo/schema';

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
            import(`@/messages/${locale}.json`).then((m) => m.default),
            import(`@/messages/navigation/${locale}.json`).then((m) => m.default),
            import(`@/messages/home/${locale}.json`).then((m) => m.default),
            import(`@/messages/footer/${locale}.json`).then((m) => m.default),
        ]);

        messages = {
            common,
            navigation,
            home,
            footer,
        };
    } catch (error) {
        console.error('Error loading messages:', error);
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

