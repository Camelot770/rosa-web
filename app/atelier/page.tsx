import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { StorySection } from '@/app/components/sections/StorySection';

export const metadata: Metadata = {
  title: 'Atelier · Студия в Татарстане · Роза Цветов',
  description:
    'Студия «Роза Цветов» работает с 2017 года в Казани. Технология стабилизации цветов натуральными растительными соками — патент RU 2 698 058.',
};

export default function AtelierPage() {
  return (
    <>
      <Header />
      <main>
        <StorySection />
      </main>
      <Footer />
    </>
  );
}
