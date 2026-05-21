import { Intro } from './components/Intro';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AudiencesSection } from './components/sections/AudiencesSection';
import { IndexSection } from './components/sections/IndexSection';
import { EditorialSection } from './components/sections/EditorialSection';
import { PlatesSection } from './components/sections/PlatesSection';
import { StorySection } from './components/sections/StorySection';
import { PatentSection } from './components/sections/PatentSection';
import { CatalogSpread } from './components/sections/CatalogSpread';
import { FAQSection } from './components/sections/FAQSection';
import { CareSection } from './components/sections/CareSection';
import { SubscribeSection } from './components/sections/SubscribeSection';
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
      <Header bouquetCount={bouquets.length} />
      <main>
        <HeroSection totalBouquets={bouquets.length} featured={featured} />
        <AudiencesSection />
        <IndexSection totalBouquets={bouquets.length} />
        <EditorialSection />
        <PlatesSection bouquets={bouquets} />
        <StorySection />
        <PatentSection />
        <CatalogSpread bouquets={bouquets} limit={8} />
        <FAQSection />
        <CareSection />
        <SubscribeSection />
      </main>
      <Footer />
    </>
  );
}
