import * as React from 'react';
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@workspace/shadcn-components/src/components/card';

export interface SimpleCardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * SimpleCard - упрощенная карточка, скрывающая сложность shadcn компонентов
 *
 * @example
 * ```tsx
 * <SimpleCard
 *   title="Заголовок"
 *   description="Описание"
 *   action={<Button>Действие</Button>}
 * >
 *   Контент карточки
 * </SimpleCard>
 * ```
 */
export function SimpleCard({
  title,
  description,
  children,
  footer,
  action,
  className,
}: SimpleCardProps) {
  return (
    <ShadcnCard className={className}>
      {(title || description || action) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {action && <CardAction>{action}</CardAction>}
        </CardHeader>
      )}
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </ShadcnCard>
  );
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card - простая обертка над shadcn Card
 */
export function Card({ children, className }: CardProps) {
  return <ShadcnCard className={className}>{children}</ShadcnCard>;
}

export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@workspace/shadcn-components/components/card';

