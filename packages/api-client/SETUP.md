# Настройка API Client Package

## Шаги для первого запуска

### 1. Установка зависимостей

```bash
# Из корня монорепы
pnpm install
```

### 2. Запуск бэкенда

Убедитесь, что бэкенд запущен и доступен:

```bash
# Запустите API
pnpm --filter @workspace/api dev

# Проверьте что Swagger доступен
# Откройте в браузере: http://localhost:3001/api/docs
# Или проверьте OpenAPI JSON: http://localhost:3001/api/openapi.json
```

### 3. Генерация API клиента

```bash
# Из корня монорепы
pnpm api:generate

# Или из пакета
cd packages/api-client
pnpm generate
```

### 4. Проверка генерации

После генерации должны появиться файлы:

```
packages/api-client/src/
├── api/
│   ├── auth/
│   ├── crm/
│   ├── portals/
│   └── index.ts
└── types/
    ├── models/
    └── index.ts
```

### 5. Использование во фронтендах

Теперь можно импортировать типы и API клиенты:

```typescript
// В apps/crm или apps/web
import { AuthControllerService } from '@workspace/api-client';
import type { User } from '@workspace/api-client';
```

## Автоматическая регенерация

Для автоматической регенерации при изменении API:

```bash
pnpm api:generate:watch
```

Этот процесс будет следить за изменениями в OpenAPI спецификации и автоматически регенерировать клиент.

## Интеграция в workflow

### Перед коммитом

Рекомендуется регенерировать API клиент перед коммитом изменений в бэкенде:

```bash
pnpm api:generate
git add packages/api-client/src
```

### В CI/CD

Добавьте в ваш CI pipeline:

```yaml
- name: Generate API Client
  run: |
    # Запустить бэкенд в фоне
    pnpm --filter @workspace/api dev &
    sleep 10
    # Сгенерировать клиент
    pnpm api:generate
```

## Troubleshooting

### Проблема: OpenAPI spec недоступен

**Решение:** Убедитесь что:
1. Бэкенд запущен на порту 3001
2. Swagger настроен в `apps/api/src/main.ts`
3. Endpoint `/api/openapi.json` доступен

### Проблема: Типы не обновляются

**Решение:**
1. Удалите `packages/api-client/src/api` и `packages/api-client/src/types`
2. Запустите генерацию заново: `pnpm api:generate`
3. Перезапустите TypeScript сервер в IDE (VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")

### Проблема: Ошибки импорта в фронтендах

**Решение:**
1. Убедитесь что пакет добавлен в `package.json` фронтенда:
   ```json
   {
     "dependencies": {
       "@workspace/api-client": "workspace:*"
     }
   }
   ```
2. Переустановите зависимости: `pnpm install`
3. Убедитесь что API клиент сгенерирован: `pnpm api:generate`

