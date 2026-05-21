import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { EditorialSection } from '@/app/components/sections/EditorialSection';

export const metadata: Metadata = {
  title: 'Editorial · Философия названий · Роза Цветов',
  description:
    'Имена нашего каталога живут в одном ряду — от воздуха к камню. Структура букетов «Роза Цветов» по четырём коллекциям: Утренний свет, Шёлковая, Будуарная, Atelier Luxe.',
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
