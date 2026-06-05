import { Intro } from './components/Intro';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AudiencesSection } from './components/sections/AudiencesSection';
import { IndexSection } from './components/sections/IndexSection';
import { EditorialSection } from './components/sections/EditorialSection';
import { PlatesSection } from './components/sections/PlatesSection';
import { StorySection } from './components/sections/StorySection';
import { RecognitionSection } from './components/sections/RecognitionSection';
import { PatentSection } from './components/sections/PatentSection';
import { CatalogSpread } from './components/sections/CatalogSpread';
import { FAQSection } from './components/sections/FAQSection';
import { CareSection } from './components/sections/CareSection';
import { SubscribeSection } from './components/sections/SubscribeSection';
import { MarqueeStrip } from './components/MarqueeStrip';
import { ScrollProgress } from './components/ScrollProgress';
import { SectionScribe } from './components/SectionScribe';
import { fetchBouquets } from '@/lib/api';
import { BOUQUETS } from '@/lib/bouquets-data';

export const revalidate = 60;

export default async function HomePage() {
  // Live data from rosa-flowers-server. Falls back to the bundled snapshot
  // if the API is unreachable during build (e.g. cold Amvera).
  let bouquets;
  try {
    bouquets = await fetchBouquets();
  } catch (err) {
    console.warn('[home] live API unavailable, using bundled snapshot:', err);
    bouquets = BOUQUETS;
  }

  // Pick the most expensive in-stock bouquet for the magazine cover slot.
  // Updating the prices in admin changes the cover automatically (with the
  // 60s ISR window).
  const featured = bouquets.length
    ? [...bouquets].sort((a, b) => b.price - a.price)[0]
    : null;

  return (
    <>
      <Intro />
      <ScrollProgress />
      <Header bouquetCount={bouquets.length} />
      <main>
        <HeroSection totalBouquets={bouquets.length} featured={featured} />
        <AudiencesSection />
        <RecognitionSection />
        <IndexSection totalBouquets={bouquets.length} />
        <EditorialSection />
        <MarqueeStrip
          items={[
            'Atelier · Kazan · Tatarstan',
            'Est. 2017',
            `${bouquets.length} букетов в каталоге`,
            'Соло · Дуэт · Квартет · Оркестр',
            'Patent RU 2 698 058',
            'Сезон 17 · Май 2026',
          ]}
        />
        <PlatesSection bouquets={bouquets} />
        <StorySection />
        <PatentSection />
        <SectionScribe label="✦ Каталог" />
        <CatalogSpread bouquets={bouquets} limit={8} />
        <FAQSection />
        <SectionScribe label="✦ Уход" />
        <CareSection />
        <SubscribeSection />
      </main>
      <Footer />
    </>
  );
}
