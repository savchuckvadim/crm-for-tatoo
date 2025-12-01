# 04 — Backend (NestJS)

## Архитектура и модули

### 1. AuthModule
- Регистрация, вход (email/password, OAuth опционально)  
- Multi-portal аутентификация: User → UserPortalRole → Portal  
- JWT + Refresh tokens, 2FA (email/SMS)  
- Сессии и audit log действий пользователей  
- Защита от brute-force (rate-limiting)

### 2. UsersModule
- Профили пользователей (имя, контакты, фото)  
- Роли и права: Owner, Admin, Manager, Employee  
- Персональные настройки (notifications, language, timezone)  

### 3. PortalsModule
- Создание и настройка порталов (салонов)  
- Поддержка субдоменов и уникальных URL  
- Настройки портала: цветовая схема, logo, настройки GDPR  
- Подписки и биллинг: Stripe / Mollie / PayPal integration  
- Логи активности портала  

### 4. CRMModule
- Основные CRM сущности: Client, Lead, Deal, Appointment  
- Пользовательские сущности и стадии
- Поддержка кастомных полей (CustomFieldsModule)  
- Связи между сущностями (например, Deal → Client, Lead → Deal)  
- История изменений (audit log)  

### 5. Products/ServicesModule
- Услуги салона: тату, уход, консультации  
- Цены, длительность, портфолио, availability  
- API для фронтенда: фильтры, категории, поиск  

### 6. AppointmentsModule
- Запись клиентов → создание события в календаре  
- Интеграция с Google Calendar / Outlook  
- Drag&drop для изменений расписания  
- Напоминания через email/SMS/Telegram  

### 7. PaymentsModule
- Поддержка EU-ready платежных систем: Stripe, Mollie, PayPal  
- Подписки, разовые платежи, инвойсы  
- VAT, возвраты, безопасность PCI DSS  
- Вебхуки для обновления статусов транзакций  

### 8. SeoModule
- Ключевые слова и семантическое ядро  
- AI генерация статей и SEO контента  
- Cron jobs / очереди для автоматической генерации  
- API для фронтенда: рекомендации по улучшению контента  

### 9. SerpModule
- Мониторинг позиций в поисковых системах (SerpAPI)  
- История изменений и графики для портала  
- Автоматические отчеты и нотификации  

### 10. IntegrationsModule
- Instagram Webhook → лиды  
- Встраиваемые формы на сайт → лиды  
- Google Search Console API integration  
- Возможность расширять под новые интеграции  

### 11. NotificationsModule
- Email (SMTP / SendGrid)  
- SMS (Twilio / MessageBird)  
- Telegram / Slack уведомления  
- Настройка шаблонов уведомлений и триггеров  

---

## Auth и Multi-Portal

- Модель:  
