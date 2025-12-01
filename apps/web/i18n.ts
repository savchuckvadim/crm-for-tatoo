export const locales = ['ru', 'en', 'es', 'de', 'fr', 'nl', 'sv', 'fi', 'uk'] as const;
export const defaultLocale = 'ru' as const;

export type Locale = (typeof locales)[number];

