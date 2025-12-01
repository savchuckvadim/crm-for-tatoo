'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
    const t = useTranslations('footer');
    const locale = useLocale();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container px-4 py-12 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">{t('brand.title')}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t('brand.description')}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">{t('product.title')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={`/${locale}#features`} className="text-muted-foreground hover:text-foreground">
                                    {t('product.features')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}#pricing`} className="text-muted-foreground hover:text-foreground">
                                    {t('product.pricing')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/book`} className="text-muted-foreground hover:text-foreground">
                                    {t('product.register')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">{t('resources.title')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={`/${locale}/blog`} className="text-muted-foreground hover:text-foreground">
                                    {t('resources.blog')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/contact`} className="text-muted-foreground hover:text-foreground">
                                    {t('resources.contacts')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/artists`} className="text-muted-foreground hover:text-foreground">
                                    {t('resources.artists')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">{t('support.title')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={`/${locale}/contact`} className="text-muted-foreground hover:text-foreground">
                                    {t('support.contact')}
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground">
                                    {t('support.docs')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {currentYear} Tattoo CRM. {t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
}

