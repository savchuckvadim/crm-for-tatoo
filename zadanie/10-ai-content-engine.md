# 10 — AI Content Engine

## Возможности
- Генерация статей по ключевым словам
- Автономная ревизия контента (SEO score)
- Генерация изображений (hero images/og) — через генеративный сервис
- Проверка на дубликаты и плагиат (порог)
- Template-based article generation (prompts stored in DB)

## Компоненты
- Prompt library
- Quality checker (length, headings, keyword density, readability)
- Publish adapter (CMS API / Next.js content)
- Human-in-loop mode: вариант с утверждением редактором

## Хранение
- Все версии статей сохраняются (versioning)
- Возможность отката
