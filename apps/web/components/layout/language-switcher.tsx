'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@workspace/shadcn-components/components/popover';
import { SimpleButton } from '@workspace/ui';
import { locales } from '@/i18n';

const localeNames: Record<string, string> = {
    ru: 'Русский',
    en: 'English',
    es: 'Español',
    de: 'Deutsch',
    fr: 'Français',
    nl: 'Nederlands',
    sv: 'Svenska',
    fi: 'Suomi',
    uk: 'Українська',
};

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        // Удаляем текущую локаль из пути
        const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
        // Добавляем новую локаль
        const newPath = `/${newLocale}${pathWithoutLocale}`;
        router.push(newPath);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <SimpleButton variant="ghost" size="sm" className="gap-2">
                    <Globe size={16} />
                    <span className="hidden sm:inline">{localeNames[locale] || locale}</span>
                </SimpleButton>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2" align="end">
                <div className="flex flex-col gap-1">
                    {locales.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => switchLocale(loc)}
                            className={`px-3 py-2 text-sm rounded-md text-left transition-colors ${locale === loc
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                                }`}
                        >
                            {localeNames[loc]}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

