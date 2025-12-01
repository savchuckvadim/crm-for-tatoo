# Интеграция API Client в монорепу

## Быстрый старт

### 1. Установка зависимостей

```bash
# Из корня монорепы
pnpm install
```

### 2. Генерация API клиента

**Важно:** Перед генерацией убедитесь, что бэкенд запущен на `http://localhost:3001`

```bash
# Генерация один раз
pnpm api:generate

# Или из пакета напрямую
pnpm --filter @workspace/api-client run generate

# Watch режим (автоматическая регенерация при изменении OpenAPI)
pnpm api:generate:watch
```

### 3. Использование во фронтендах

После генерации API клиент будет доступен в `apps/crm` и `apps/web`:

```typescript
// Импорт типов
import type { User, Client, Lead, Deal, CreateClientDto } from '@workspace/api-client';

// Импорт API сервисов
import { 
  AuthControllerService,
  ClientsControllerService,
  LeadsControllerService,
  PortalsControllerService 
} from '@workspace/api-client';
```

## Примеры использования

### Регистрация пользователя

```typescript
import { AuthControllerService } from '@workspace/api-client';

const handleRegister = async (data: { email: string; password: string; name: string; surname: string }) => {
  try {
    const response = await AuthControllerService.authControllerRegister(data);
    console.log('User registered:', response);
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};
```

### Работа с клиентами

```typescript
import { ClientsControllerService } from '@workspace/api-client';
import type { CreateClientDto, Client } from '@workspace/api-client';

// Получить всех клиентов портала
const getClients = async (portalId: string): Promise<Client[]> => {
  return await ClientsControllerService.clientsControllerFindAll(portalId);
};

// Создать клиента
const createClient = async (portalId: string, data: CreateClientDto): Promise<Client> => {
  return await ClientsControllerService.clientsControllerCreate(portalId, data);
};
```

### Работа с лидами

```typescript
import { LeadsControllerService } from '@workspace/api-client';
import type { Lead, CreateLeadDto } from '@workspace/api-client';

// Получить все лиды
const getLeads = async (portalId: string, status?: LeadStatus): Promise<Lead[]> => {
  return await LeadsControllerService.leadsControllerFindAll(portalId, status);
};

// Конвертировать лид в клиента
const convertLead = async (portalId: string, leadId: string) => {
  return await LeadsControllerService.leadsControllerConvertToClient(portalId, leadId);
};
```

### Использование в React компонентах

```typescript
'use client';

import { useState, useEffect } from 'react';
import { ClientsControllerService } from '@workspace/api-client';
import type { Client } from '@workspace/api-client';

export function ClientsList({ portalId }: { portalId: string }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await ClientsControllerService.clientsControllerFindAll(portalId);
        setClients(data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [portalId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {clients.map((client) => (
        <div key={client.id}>
          {client.firstName} {client.lastName}
        </div>
      ))}
    </div>
  );
}
```

## Настройка базового URL

По умолчанию API клиент использует `http://localhost:3001/api`.

Для изменения базового URL:

### Через переменную окружения (рекомендуется)

Создайте `.env.local` в `apps/crm` или `apps/web`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Или для production:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

### Через изменение mutator.ts

Отредактируйте `packages/api-client/src/mutator.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://your-api-url.com/api';
```

## Автоматическая генерация

### В Turbo pipeline

При сборке проекта Turbo автоматически запустит генерацию API клиента благодаря зависимости в `turbo.json`:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build", "@workspace/api-client#generate"]
    }
  }
}
```

### В CI/CD

Добавьте генерацию в ваш CI pipeline:

```yaml
- name: Generate API Client
  run: pnpm api:generate
```

## Структура сгенерированных файлов

После генерации структура будет следующей:

```
packages/api-client/
├── src/
│   ├── api/
│   │   ├── auth/
│   │   │   └── auth-controller.ts      # Auth API
│   │   ├── crm/
│   │   │   ├── clients-controller.ts   # Clients API
│   │   │   ├── leads-controller.ts     # Leads API
│   │   │   └── deals-controller.ts     # Deals API
│   │   ├── portals/
│   │   │   └── portals-controller.ts   # Portals API
│   │   └── index.ts                    # Экспорт всех API
│   ├── types/
│   │   ├── models/                     # Модели данных
│   │   └── index.ts                    # Экспорт всех типов
│   ├── mutator.ts                      # Кастомный axios instance
│   └── index.ts                        # Главный экспорт
```

## Troubleshooting

### Ошибка: Cannot find module '@workspace/api-client'

Убедитесь, что:
1. Пакет установлен: `pnpm install`
2. API клиент сгенерирован: `pnpm api:generate`
3. Бэкенд запущен и доступен на `http://localhost:3001`

### Ошибка: OpenAPI spec not found

Проверьте:
1. Бэкенд запущен на порту 3001
2. Swagger доступен по адресу `http://localhost:3001/api/docs`
3. OpenAPI JSON доступен по адресу `http://localhost:3001/api/openapi.json`

### Типы не обновляются

1. Удалите старые сгенерированные файлы
2. Запустите генерацию заново: `pnpm api:generate`
3. Перезапустите TypeScript сервер в IDE

