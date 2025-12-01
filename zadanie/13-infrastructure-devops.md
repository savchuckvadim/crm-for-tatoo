# 13 — Infrastructure & DevOps

## Environments
- local (dev)
- staging
- production

## Deploy
- Monorepo CI: tests, lint, build apps, run migrations
- Deploy frontend to Vercel, backend to managed host (Railway / Hetzner / AWS)
- Dockerfile per service

## Observability
- Sentry for errors
- Prometheus + Grafana for metrics
- Logs → centralized ELK/Vector

## Backups
- Daily DB backups, retention 30 days
- Offsite backups for media

## Secrets
- Vault / secrets manager
