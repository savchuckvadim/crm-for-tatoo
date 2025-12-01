export const SITE_CONFIG = {
  name: 'Tattoo CRM',
  description: 'CRM, созданная для тату-мастеров. Все клиенты, записи и финансы в одном месте.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tattoo-crm.com',
  ogImage: '/og-image.jpg',
} as const;

export const SEO_DEFAULT = {
  title: 'Tattoo CRM - Управляй своей тату-студией. Легко.',
  description: SITE_CONFIG.description,
  keywords: [
    'CRM для тату салона',
    'управление тату студией',
    'запись на татуировку онлайн',
    'CRM тату мастера',
    'управление клиентами тату салона',
    'программа для тату салона',
    'автоматизация тату студии',
  ],
};

