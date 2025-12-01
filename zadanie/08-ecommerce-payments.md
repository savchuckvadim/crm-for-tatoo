# 08 — Payments & Billing (EU-ready)

## Поддерживаемые провайдеры
- Stripe (Payments, SEPA, recurring)
- Mollie (для локальных платежей в ЕС)
- PayPal (опционально)

## Функционал
- Оплата услуг при бронировании
- Подписки для салонов (SaaS billing)
- Инвойсы, возвраты, VAT handling
- Отчёты по транзакциям

## Требования безопасности
- PCI‑compliant checkout (checkout pages от Stripe)
- Webhooks для подтверждения платежей
- Хранение минимальных данных о платеже (no card data)
