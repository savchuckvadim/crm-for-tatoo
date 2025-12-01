# API Client Package

Автоматически сгенерированный типизированный API клиент из Swagger/OpenAPI спецификации бэкенда.

## Установка

```bash
pnpm install
```

## Генерация клиента

Перед генерацией убедитесь, что бэкенд запущен на `http://localhost:3001`:

```bash
# Генерация один раз
pnpm generate

# Генерация с watch режимом (автоматически при изменении OpenAPI)
pnpm generate:watch
```

## Использование

### В Next.js приложениях (apps/crm, apps/web)

```typescript
import { AuthControllerService, User } from '@workspace/api-client';

// Использование API
const user = await AuthControllerService.authControllerRegister({
  email: 'test@example.com',
  password: 'password123',
  name: 'John',
  surname: 'Doe',
});

// Использование типов
import type { User, CreateClientDto } from '@workspace/api-client';
```

### Настройка базового URL

Через переменную окружения:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Или изменить в `src/mutator.ts`:
```typescript
const API_BASE_URL = 'http://your-api-url.com/api';
```

## Структура

- `src/api/` - Сгенерированные API клиенты (по тегам Swagger)
- `src/types/` - Сгенерированные TypeScript типы
- `src/mutator.ts` - Кастомный axios instance с настройками
- `src/index.ts` - Главный экспорт

## Интеграция в Turbo

Добавьте зависимость в `turbo.json`:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build", "@workspace/api-client#generate"]
    }
  }
}
```

