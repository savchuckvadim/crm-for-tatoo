import * as React from 'react';
import { Button as ShadcnButton } from '@workspace/shadcn-components/src/components/button';

type ShadcnButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnButton>;

export interface SimpleButtonProps extends Omit<ShadcnButtonProps, 'variant' | 'size'> {
    /**
     * Упрощенные варианты кнопки
     */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    /**
     * Размер кнопки
     */
    size?: 'sm' | 'md' | 'lg';
}

const variantMap: Record<NonNullable<SimpleButtonProps['variant']>, ShadcnButtonProps['variant']> = {
    primary: 'default',
    secondary: 'secondary',
    outline: 'outline',
    ghost: 'ghost',
    danger: 'destructive',
};

const sizeMap: Record<NonNullable<SimpleButtonProps['size']>, ShadcnButtonProps['size']> = {
    sm: 'sm',
    md: 'default',
    lg: 'lg',
};

/**
 * SimpleButton - упрощенная кнопка с понятными вариантами
 *
 * @example
 * ```tsx
 * <SimpleButton variant="primary" size="md">
 *   Нажать
 * </SimpleButton>
 * ```
 */
export function SimpleButton({
    variant = 'primary',
    size = 'md',
    ...props
}: SimpleButtonProps) {
    return (
        <ShadcnButton
            variant={variantMap[variant]}
            size={sizeMap[size]}
            {...props}
        />
    );
}

/**
 * Button - реэкспорт shadcn Button для прямого использования
 */
export { Button } from '@workspace/shadcn-components/src/components/button';

export type ButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnButton>;

