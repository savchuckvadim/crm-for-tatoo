# 🐳 Multi-stage build
FROM node:20 AS base

WORKDIR /app

# Установка PNPM
RUN npm i -g pnpm

# Копируем все файлы сразу
COPY . .

# Установка зависимостей и генерация Prisma Client
RUN pnpm config set fetch-retries 5 && \
    pnpm config set fetch-timeout 60000 && \
    pnpm install --no-frozen-lockfile && \
    cd packages/prisma && \
    pnpm prisma generate

# Сборка NestJS API и проверка
RUN pnpm --filter api run build && \
    ls -la apps/api/dist || (echo "Build failed - dist directory not found" && exit 1)

# ==== PRODUCTION ====
FROM node:20-slim AS prod

WORKDIR /app

# Копируем только необходимые файлы
COPY --from=base /app/apps/api/dist ./dist
COPY --from=base /app/apps/api/package.json ./package.json
COPY --from=base /app/package.json ./root-package.json
COPY --from=base /app/pnpm-workspace.yaml ./
COPY --from=base /app/packages ./packages
COPY --from=base /app/apps/api/.env ./.env

# Установка PNPM и зависимостей
RUN npm i -g pnpm && \
    pnpm install --prod --no-frozen-lockfile && \
    pnpm --filter api install --prod --no-frozen-lockfile

# Запуск NestJS
CMD ["node", "dist/main"]
