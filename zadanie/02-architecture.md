# 02 — Architecture

## Общая схема
Monorepo содержит:
- `/apps/web` — Next.js маркетинговый сайт (App Router)
- `/apps/crm` — Next.js клиентский интерфейс CRM (админка/портал)
- `/services/api` — NestJS backend (REST + GraphQL опционально)
- `/packages/*` — общие библиотеки (ui, hooks, auth, types, db)
- infra (docker, k8s manifests, terraform snippets)

## Компоненты
- API Gateway (auth, rate limiting)
- Auth Service (JWT + refresh tokens + OAuth2 для Instagram/Google)
- CRM Core (users, portals, permissions, entities)
- Billing Service (Stripe / Mollie / SEPA)
- SEO Service (AI jobs, embeddings, RAG storage)
- Serp Monitor (cron workers)
- Worker Queue (BullMQ + Redis)
- Storage (S3 / Cloudflare R2)
- Websockets

## Безопасность и соответствие
- GDPR: удаление данных по запросу, хранение согласий
- Audit log для действий менеджеров
- RBAC: роли — owner, manager, artist, accountant
- CSP, rate limits, WAF

## Масштабируемость
- Отдельные горизонтально масштабируемые сервисы
- Redis для кэширования и очередей
- PostgreSQL с read replicas при необходимости
