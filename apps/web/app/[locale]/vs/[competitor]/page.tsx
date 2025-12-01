import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

// Comparison pages are strong SEO tools
// Examples: /vs/squarespace-booking, /vs/fresha, /vs/vagaro

const competitors = {
    'squarespace-booking': {
        name: {
            ru: 'Squarespace Booking',
            en: 'Squarespace Booking',
            es: 'Squarespace Booking',
            de: 'Squarespace Booking',
            fr: 'Squarespace Booking',
            nl: 'Squarespace Booking',
            sv: 'Squarespace Booking',
            fi: 'Squarespace Booking',
            uk: 'Squarespace Booking',
        },
    },
    fresha: {
        name: {
            ru: 'Fresha',
            en: 'Fresha',
            es: 'Fresha',
            de: 'Fresha',
            fr: 'Fresha',
            nl: 'Fresha',
            sv: 'Fresha',
            fi: 'Fresha',
            uk: 'Fresha',
        },
    },
    vagaro: {
        name: {
            ru: 'Vagaro',
            en: 'Vagaro',
            es: 'Vagaro',
            de: 'Vagaro',
            fr: 'Vagaro',
            nl: 'Vagaro',
            sv: 'Vagaro',
            fi: 'Vagaro',
            uk: 'Vagaro',
        },
    },
};

export async function generateStaticParams() {
    return Object.keys(competitors).map((competitor) => ({
        competitor,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; competitor: string }>;
}): Promise<Metadata> {
    const { locale, competitor } = await params;
    const comp = competitors[competitor as keyof typeof competitors];

    if (!comp) {
        return {};
    }

    const competitorName =
        comp.name[locale as keyof typeof comp.name] || comp.name.en;

    const comparisonTexts: Record<string, string> = {
        ru: `Сравнение Tattoo CRM и ${competitorName} для тату-студий`,
        en: `Tattoo CRM vs ${competitorName} comparison for tattoo studios`,
        es: `Comparación de Tattoo CRM y ${competitorName} para estudios de tatuajes`,
        de: `Vergleich von Tattoo CRM und ${competitorName} für Tattoo-Studios`,
        fr: `Comparaison de Tattoo CRM et ${competitorName} pour studios de tatouage`,
        nl: `Vergelijking van Tattoo CRM en ${competitorName} voor tattoo studios`,
        sv: `Jämförelse mellan Tattoo CRM och ${competitorName} för tatueringsstudios`,
        fi: `Tattoo CRM vs ${competitorName} vertailu tatuointistudioille`,
        uk: `Порівняння Tattoo CRM та ${competitorName} для тату-студій`,
    };

    return generateSEOMetadata({
        title: `Tattoo CRM vs ${competitorName}`,
        description: comparisonTexts[locale] || comparisonTexts.en || '',
        url: `${SITE_CONFIG.url}/${locale}/vs/${competitor}`,
        locale,
        keywords: [
            `tattoo CRM vs ${competitorName}`,
            `${competitorName} alternative`,
            'best tattoo booking software',
            'tattoo studio software comparison',
        ],
        type: 'article',
    });
}

export default async function ComparisonPage({
    params,
}: {
    params: Promise<{ locale: string; competitor: string }>;
}) {
    const { locale, competitor } = await params;
    const comp = competitors[competitor as keyof typeof competitors];

    if (!comp) {
        notFound();
    }

    const competitorName =
        comp.name[locale as keyof typeof comp.name] || comp.name.en;

    const comparisonTexts: Record<string, string> = {
        ru: 'Сравнение функций, цен и возможностей',
        en: 'Comparison of features, prices and capabilities',
        es: 'Comparación de funciones, precios y capacidades',
        de: 'Vergleich von Funktionen, Preisen und Möglichkeiten',
        fr: 'Comparaison des fonctionnalités, prix et capacités',
        nl: 'Vergelijking van functies, prijzen en mogelijkheden',
        sv: 'Jämförelse av funktioner, priser och möjligheter',
        fi: 'Ominaisuuksien, hintojen ja mahdollisuuksien vertailu',
        uk: 'Порівняння функцій, цін та можливостей',
    };

    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-4">
                Tattoo CRM vs {competitorName}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
                {comparisonTexts[locale] || comparisonTexts.en}
            </p>
            {/* Add comparison table and content here */}
        </div>
    );
}

