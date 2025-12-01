# @workspace/ui

Готовые компоненты UI, которые скрывают сложность базовых shadcn компонентов из `@workspace/shadcn-components`.

## Философия

Этот пакет предоставляет упрощенные компоненты с понятным API, которые внутри используют компоненты из `@workspace/shadcn-components` (shadcn).

### Пример разницы:

**С @workspace/shadcn-components (shadcn):**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@workspace/shadcn-components/components/card';

<Card>
  <CardHeader>
    <CardTitle>Заголовок</CardTitle>
    <CardDescription>Описание</CardDescription>
  </CardHeader>
  <CardContent>
    Контент
  </CardContent>
</Card>
```

**С @workspace/ui:**
```tsx
import { SimpleCard } from '@workspace/ui';

<SimpleCard 
  title="Заголовок" 
  description="Описание"
>
  Контент
</SimpleCard>
```

## Компоненты

### SimpleCard

Упрощенная карточка с простым API.

```tsx
import { SimpleCard } from '@workspace/ui';

<SimpleCard 
  title="Заголовок"
  description="Описание карточки"
  action={<Button>Действие</Button>}
  footer={<Button>В футере</Button>}
>
  Основной контент карточки
</SimpleCard>
```

### SimpleButton

Упрощенная кнопка с понятными вариантами.

```tsx
import { SimpleButton } from '@workspace/ui';

<SimpleButton variant="primary" size="md">
  Нажать
</SimpleButton>
```

Варианты:
- `primary` - основная кнопка
- `secondary` - вторичная
- `outline` - с обводкой
- `ghost` - прозрачная
- `danger` - опасное действие

Размеры:
- `sm` - маленькая
- `md` - средняя (по умолчанию)
- `lg` - большая

## Использование

```bash
pnpm add @workspace/ui
```

```tsx
import { SimpleCard, SimpleButton } from '@workspace/ui';
```

