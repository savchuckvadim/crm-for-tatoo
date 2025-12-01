# 09 — SEO Automation (full)

## Цели
- Автоматическая генерация семантического ядра по нише "тату" и смежным темам
- Создание и публикация SEO‑статей на маркетинговом сайте
- Мониторинг позиций и автоматические рекомендации
- Внутренняя перелинковка и schema.org

## Компоненты
1. Keyword discovery (OpenAI + SerpAPI)
2. Keyword DB + clustering
3. Article generator pipeline:
   - outline → draft → SEO check → publish
4. Metadata generator (title, desc, og)
5. FAQ schema generator
6. Internal linking suggestions
7. Auto‑translations для локалей

## Workflow
- Cron/job генерирует список тем → редактор утверждает → публикация
- Если позиции падают → AI рекомендует переписать/обновить статью → task в CRM admin



# 09 — SEO Automation (AI-driven) — Expanded Spec

## Цель
Построить систему, которая максимально автоматизирует исследования ключевых слов, генерацию контента, мониторинг позиций и оперативную реакцию на падения позиций, с опцией human-in-the-loop перед публикацией.

## Компоненты (полный список)
1. **Keyword Discovery Service**
   - Источники: SerpAPI, Ahrefs/SEMrush (опционально), Google Autosuggest, Google Trends, OpenAI.
   - Функции: seed-expansion, seasonal trends, intent classification.

2. **Keyword DB & Clustering**
   - Таблица: keywords { id, keyword, locale, intent, volume, difficulty, cluster_id, priority, created_at }
   - Clustering: topically group keywords (HDBSCAN/k-means + semantic embeddings).

3. **Content Planner**
   - Создаёт content calendar на основе priority и seasonal trends.
   - Генерирует briefs (title, meta, outline, target keywords, suggested internal links).

4. **Article Generator Pipeline**
   - Stages:
     1. Outline generation (AI)
     2. Draft generation (AI)
     3. SEO-check (automated rules + AI scoring)
     4. Plagiarism check (3rd party)
     5. Human review (optional)
     6. Publish (via CMS/Next.js content API)
   - Stores versions and audit logs.

5. **Metadata Generator**
   - Title, meta description, OG image suggestions, alt text for images.

6. **FAQ / Schema Generator**
   - Generate FAQ + JSON-LD
   - Generate Article schema + Breadcrumbs + LocalBusiness where applicable.

7. **Internal Linking Suggestor**
   - Uses embeddings + backlink graph to suggest internal links and anchor texts.

8. **SERP Monitoring & Alerting**
   - Daily cron using SerpAPI: track positions for target keywords per locale.
   - DB: serp_positions { keyword_id, date, position, snippet, url }.
   - Thresholds: if drop > N positions or CTR falls → create analysis task.

9. **AI SEO Auditor**
   - When triggered, runs competitor content comparison, gap analysis, and returns:
     - list of paragraphs to rewrite
     - new H2/H3 suggestions
     - keywords to inject
     - CTAs and internal links to add
   - Generates actionable PRD for editor.

10. **Auto-translations**
    - Generate translated draft per locale; require human post-edit for publication or light post-edit flow.

11. **Publishing & Scheduling**
    - Integrates with Next.js content API (markdown/files) or headless CMS (Sanity/Strapi/Payload).
    - Supports scheduled publish and rollback.

12. **Quality & Safety**
    - Plagiarism detection (Copyscape/third party).
    - Readability & SEO score thresholds.
    - Human-in-the-loop gating for high-impact pages (e.g., money pages).

13. **Reporting Dashboard**
    - Visibility trends, position graphs, traffic, content performance, backlog of AI tasks.

14. **Notifications**
    - Telegram / Email / Slack for alerts and daily summaries.

## Data model (key tables) — example
- keywords (id, keyword, locale, intent, volume, difficulty, cluster_id, priority, target_url, status)
- clusters (id, name, pillar_url)
- articles (id, title, slug, locale, status, version, seo_score)
- serp_positions (id, keyword_id, date, position, url, snippet)
- ai_tasks (id, type, payload, status, assigned_to, result)

## Workflows / cron schedules
- **Daily**: SERP check (all high-priority keywords)
- **Weekly**: keyword discovery job (add new longtails and trends)
- **Weekly**: content planner refresh (publish queue)
- **OnDrop (event)**: if serp drop > 3 positions → trigger AI Auditor → create task in Admin (with suggested content changes)
- **Monthly**: re-cluster keywords, update priorities

## Example thresholds / SLAs
- SERP drop threshold: 3 positions (configurable per keyword)
- AI draft time SLA: < 2 minutes per 1k words (async worker)
- Human review SLA: 48 hours (configurable)
- Plagiarism tolerance: 0% (block publish), similarity > 20% → flag

## Example prompts (ready-to-use)

### 1) Keyword expansion (OpenAI)
