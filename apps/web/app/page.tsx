import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

// Редирект на дефолтную локаль
export default function RootPage() {
    redirect(`/${defaultLocale}`);
}
