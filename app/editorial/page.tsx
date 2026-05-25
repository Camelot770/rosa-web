import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { EditorialSection } from '@/app/components/sections/EditorialSection';

export const metadata: Metadata = {
  title: 'Editorial · Философия названий · Роза Цветов',
  description:
    'Имена коллекций «Розы Цветов» — это шкала воздуха. От полного штиля к высотному потоку. Четыре ступени: Штиль, Бриз, Полёт, Высота.',
};

export default function EditorialPage() {
  return (
    <>
      <Header />
      <main>
        <EditorialSection />
      </main>
      <Footer />
    </>
  );
}
