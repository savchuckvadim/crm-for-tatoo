import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './i18n';

export default getRequestConfig(async ({ locale }) => {
    // If no locale is provided, use the default locale
    const validLocale =
        locale && locales.includes(locale as any) ? locale : defaultLocale;

    return {
        locale: validLocale,
    };
});

