import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { Testimonials } from '@/components/sections/testimonials';
import { CTA } from '@/components/sections/cta';
import { SEO_DEFAULT } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Главная',
  description: SEO_DEFAULT.description,
  openGraph: {
    title: SEO_DEFAULT.title,
    description: SEO_DEFAULT.description,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
}
