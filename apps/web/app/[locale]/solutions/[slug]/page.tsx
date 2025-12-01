import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

// This is a placeholder for solution landing pages
// Examples: /solutions/tattoo-artists, /solutions/studio-owners, etc.

const solutions = {
    'tattoo-artists': {
        title: {
            ru: 'CRM для тату-мастеров',
            en: 'CRM for Tattoo Artists',
            es: 'CRM para Tatuadores',
            de: 'CRM für Tätowierer',
            fr: 'CRM pour Tatoueurs',
            nl: 'CRM voor Tatoeëerders',
            sv: 'CRM för Tatuerare',
            fi: 'CRM tatuoijille',
            uk: 'CRM для тату-майстрів',
        },
        description: {
            ru: 'Управляйте клиентами, записями и финансами как тату-мастер',
            en: 'Manage clients, appointments, and finances as a tattoo artist',
            es: 'Gestiona clientes, citas y finanzas como tatuador',
            de: 'Verwalten Sie Kunden, Termine und Finanzen als Tätowierer',
            fr: 'Gérez les clients, rendez-vous et finances en tant que tatoueur',
            nl: 'Beheer klanten, afspraken en financiën als tattoo artiest',
            sv: 'Hantera kunder, bokningar och ekonomi som tatuerare',
            fi: 'Hallitse asiakkaita, varauksia ja taloutta tatuoijana',
            uk: 'Керуйте клієнтами, записами та фінансами як тату-майстер',
        },
    },
    'studio-owners': {
        title: {
            ru: 'CRM для владельцев тату-студий',
            en: 'CRM for Studio Owners',
            es: 'CRM para Propietarios de Estudios',
            de: 'CRM für Studio-Inhaber',
            fr: 'CRM pour Propriétaires de Studios',
            nl: 'CRM voor Studio-eigenaren',
            sv: 'CRM för Studioägare',
            fi: 'CRM studiomistajille',
            uk: 'CRM для власників тату-студій',
        },
        description: {
            ru: 'Управляйте несколькими мастерами и локациями',
            en: 'Manage multiple artists and locations',
            es: 'Gestiona múltiples artistas y ubicaciones',
            de: 'Verwalten Sie mehrere Künstler und Standorte',
            fr: 'Gérez plusieurs artistes et emplacements',
            nl: 'Beheer meerdere artiesten en locaties',
            sv: 'Hantera flera konstnärer och platser',
            fi: 'Hallitse useita taiteilijoita ja sijainteja',
            uk: 'Керуйте кількома майстрами та локаціями',
        },
    },
    'freelancers': {
        title: {
            ru: 'CRM для фрилансеров',
            en: 'CRM for Freelancers',
            es: 'CRM para Freelancers',
            de: 'CRM für Freiberufler',
            fr: 'CRM pour Freelances',
            nl: 'CRM voor Freelancers',
            sv: 'CRM för Frilansare',
            fi: 'CRM freelancereille',
            uk: 'CRM для фрілансерів',
        },
        description: {
            ru: 'Простое решение для независимых тату-мастеров',
            en: 'Simple solution for independent tattoo artists',
            es: 'Solución simple para tatuadores independientes',
            de: 'Einfache Lösung für unabhängige Tätowierer',
            fr: 'Solution simple pour tatoueurs indépendants',
            nl: 'Eenvoudige oplossing voor onafhankelijke tattoo artiesten',
            sv: 'Enkel lösning för oberoende tatuerare',
            fi: 'Yksinkertainen ratkaisu itsenäisille tatuoijille',
            uk: 'Просте рішення для незалежних тату-майстрів',
        },
    },
    'multi-location-studios': {
        title: {
            ru: 'CRM для сетей тату-студий',
            en: 'CRM for Multi-Location Studios',
            es: 'CRM para Estudios Multiubicación',
            de: 'CRM für Multi-Standort-Studios',
            fr: 'CRM pour Studios Multi-Emplacements',
            nl: 'CRM voor Multi-Locatie Studios',
            sv: 'CRM för Multiplatsstudios',
            fi: 'CRM usean sijainnin studioille',
            uk: 'CRM для мереж тату-студій',
        },
        description: {
            ru: 'Управляйте несколькими студиями из одного места',
            en: 'Manage multiple studios from one place',
            es: 'Gestiona múltiples estudios desde un solo lugar',
            de: 'Verwalten Sie mehrere Studios von einem Ort aus',
            fr: 'Gérez plusieurs studios depuis un seul endroit',
            nl: 'Beheer meerdere studios vanaf één plek',
            sv: 'Hantera flera studios från en plats',
            fi: 'Hallitse useita studioita yhdestä paikasta',
            uk: 'Керуйте кількома студіями з одного місця',
        },
    },
};

export async function generateStaticParams() {
    return Object.keys(solutions).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const solution = solutions[slug as keyof typeof solutions];

    if (!solution) {
        return {};
    }

    return generateSEOMetadata({
        title: solution.title[locale as keyof typeof solution.title] || solution.title.en,
        description:
            solution.description[locale as keyof typeof solution.description] ||
            solution.description.en,
        url: `${SITE_CONFIG.url}/${locale}/solutions/${slug}`,
        locale,
        keywords: [
            'tattoo studio CRM',
            'tattoo booking software',
            slug,
            locale === 'ru' ? 'CRM для тату салона' : 'tattoo CRM',
        ],
    });
}

export default async function SolutionPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const solution = solutions[slug as keyof typeof solutions];

    if (!solution) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-4">
                {solution.title[locale as keyof typeof solution.title] || solution.title.en}
            </h1>
            <p className="text-lg text-muted-foreground">
                {solution.description[locale as keyof typeof solution.description] ||
                    solution.description.en}
            </p>
            {/* Add more content here */}
        </div>
    );
}

