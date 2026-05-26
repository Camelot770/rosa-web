import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { EditorialSection } from '@/app/components/sections/EditorialSection';

export const metadata: Metadata = {
  title: 'Editorial · Философия названий · Роза Цветов',
  description:
    'Имена коллекций «Розы Цветов» — это четыре состава. От одного голоса до оркестра. Четыре ступени: Соло, Дуэт, Квартет, Оркестр.',
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
