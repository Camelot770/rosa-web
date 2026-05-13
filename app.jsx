/* =========================================================
   Роза Цветов — App Root
   ========================================================= */

function App() {
  return (
    <React.Fragment>
      <Header cartCount={2} />
      <main>
        <HeroSection />
        <CollectionsSection />
        <PhilosophySection />
        <HitsSection />
        <StorySection />
        <PrinciplesSection />
        <ReviewsSection />
        <PromoSection />
      </main>
      <Footer />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
