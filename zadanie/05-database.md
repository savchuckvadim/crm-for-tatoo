# 05 — Database (PostgreSQL + Prisma)

## Главные таблицы
- users
- portals
- user_portal_roles
- clients
- leads
- deals
- custom_fields
- custom_field_values
- appointments
- products (services)
- orders/payments
- seo_keywords
- seo_articles
- serp_positions
- audit_logs

## Примеры сущностей
**custom_fields**
- id
- portal_id
- entity_type (client/lead/deal)
- field_type (text/number/date/select)
- config (json)

**custom_field_values**
- entity_id
- field_id
- value (json/text)

## Векторы/Emeddings
- pgvector или отдельный Chroma/Weaviate для semantic search

## Индексы и репликация
- индекс по portal_id для шардирования данных
- логическая репликация для read replicas
