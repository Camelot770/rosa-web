import { Intro } from './components/Intro';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { IndexSection } from './components/sections/IndexSection';
import { EditorialSection } from './components/sections/EditorialSection';
import { PlatesSection } from './components/sections/PlatesSection';
import { StorySection } from './components/sections/StorySection';
import { CatalogSpread } from './components/sections/CatalogSpread';
import { CareSection } from './components/sections/CareSection';
import { SubscribeSection } from './components/sections/SubscribeSection';
import { BOUQUETS } from '@/lib/bouquets-data';

export default function HomePage() {
  // M1: static data import. M2 will replace this with a server fetch
  // to GET /api/bouquets on rosa-flowers-server.
  const bouquets = BOUQUETS;

  return (
    <>
      <Intro />
      <Header />
      <main>
        <HeroSection totalBouquets={bouquets.length} />
        <IndexSection totalBouquets={bouquets.length} />
        <EditorialSection />
        <PlatesSection bouquets={bouquets} />
        <StorySection />
        <CatalogSpread bouquets={bouquets} />
        <CareSection />
        <SubscribeSection />
      </main>
      <Footer />
    </>
  );
}
