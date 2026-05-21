import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { CareSection } from '@/app/components/sections/CareSection';

export const metadata: Metadata = {
  title: 'Care · Три правила ухода · Роза Цветов',
  description:
    'Стабилизированный букет служит 3–5 лет при соблюдении простых правил: не поливать, беречь от воды, не ставить под прямое солнце.',
};

export default function CarePage() {
  return (
    <>
      <Header />
      <main>
        <CareSection />
      </main>
      <Footer />
    </>
  );
}
