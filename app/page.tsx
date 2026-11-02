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
import { StickyFolio } from './components/StickyFolio';
import { bouquetsLabel } from '@/lib/captions';
import { loadCatalog } from '@/lib/catalog';
import { currentSeason } from '@/lib/season';

export const revalidate = 60;

export default async function HomePage() {
  // Live data from rosa-flowers-server.
  const bouquets = await loadCatalog('home');
  const season = currentSeason();

  // Magazine cover slot: the bouquet picked in admin ("На превью"), otherwise
  // the most expensive one in stock, same as the mini-apps. Changes in admin
  // show up within the 60s ISR window.
  const featured =
    bouquets.find((b) => b.isFeatured) ??
    (bouquets.length ? [...bouquets].sort((a, b) => b.price - a.price)[0] : null);

  return (
    <>
      <Intro />
      <ScrollProgress />
      <StickyFolio />
      <Header bouquetCount={bouquets.length} />
      <main>
        <HeroSection totalBouquets={bouquets.length} featured={featured} />
        <AudiencesSection />
        <RecognitionSection />
        <IndexSection totalBouquets={bouquets.length} />
        <EditorialSection bouquets={bouquets} />
        <MarqueeStrip
          items={[
            'Atelier · Kazan · Tatarstan',
            'Est. 2017',
            `${bouquetsLabel(bouquets.length)} в каталоге`,
            'Соло · Дуэт · Квартет · Оркестр',
            'Patent RU 2 698 058',
            `Сезон ${season.season} · ${season.month} ${season.year}`,
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
