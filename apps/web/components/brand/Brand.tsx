'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@workspace/shadcn-components/lib/utils';


type LogoPosition = 'left' | 'right' | 'top' | 'background';

interface BrandProps {
    showDescription?: boolean;
    showTagline?: boolean;
    size?: 'sm' | 'md' | 'lg';
    logoPosition?: LogoPosition;
    className?: string;
}

export const Brand = ({
    showDescription = false,
    showTagline = false,
    size = 'md',
    logoPosition = 'left',
    className,
}: BrandProps) => {
    const t = useTranslations('common.brand');

    const sizeConfig = {
        sm: {
            logo: 24,
            title: 'text-base',
            description: 'text-xs',
            gap: 'gap-1.5',
        },
        md: {
            logo: 32,
            title: 'text-lg',
            description: 'text-sm',
            gap: 'gap-2',
        },
        lg: {
            logo: 40,
            title: 'text-xl',
            description: 'text-base',
            gap: 'gap-2.5',
        },
    };

    const config = sizeConfig[size];

    const logoElement = (
        <div className="relative flex-shrink-0">
            <Image
                src="/logo/diamond.svg"
                alt="Ink Space"
                width={config.logo}
                height={config.logo}
                className="object-contain"
                priority
            />
        </div>
    );

    const textContent = (
        <div className="flex flex-col">
            <h1 className={cn('font-bold leading-tight text-foreground', config.title)}>
                Ink Space
            </h1>
            {showTagline && (
                <p className={cn('text-foreground leading-tight text-sm', config.description)}>
                    {t('tagline')}
                </p>
            )}
            {showDescription && (
                <p className={cn('text-muted-foreground leading-tight', config.description)}>
                    {t('description')}
                </p>
            )}
        </div>
    );

    // Позиционирование логотипа
    if (logoPosition === 'background') {
        return (
            <div className={cn('relative flex items-center justify-center', className)}>
                {/* Логотип как фон */}
                <div className="absolute inset-0 flex items-center justify-center opacity-50">
                    <Image
                        src="/logo/diamond.svg"
                        alt="Ink Space"
                        width={config.logo * 3}
                        height={config.logo * 3}
                        className="object-contain"
                        priority
                    />
                </div>
                {/* Текст поверх */}
                <div className="relative z-10 flex flex-col items-center text-center">
                    <h1 className={cn('font-bold leading-tight text-foreground', config.title)}>
                        Ink Space
                    </h1>
                    {showTagline && (
                        <p className={cn('text-muted-foreground leading-tight', config.description)}>
                            {t('tagline')}
                        </p>
                    )}
                    {showDescription && (
                        <p className={cn('text-muted-foreground leading-tight', config.description)}>
                            {t('description')}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    if (logoPosition === 'top') {
        return (
            <div className={cn('flex flex-col items-center', config.gap, className)}>
                {logoElement}
                {textContent}
            </div>
        );
    }

    if (logoPosition === 'right') {
        return (
            <div className={cn('flex items-center flex-row-reverse', config.gap, className)}>
                {logoElement}
                {textContent}
            </div>
        );
    }

    // По умолчанию: left
    return (
        <div className={cn('relative flex items-center', config.gap, className)}>


                {logoElement}

            {textContent}
        </div>
    );
};
