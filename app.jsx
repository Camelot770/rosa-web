function App() {
  return (
    <React.Fragment>
      <Intro />
      <Header />
      <main>
        <HeroSection />
        <IndexSection />
        <EditorialSection />
        <PlatesSection />
        <StorySection />
        <CatalogSpread />
        <CareSection />
        <SubscribeSection />
      </main>
      <Footer />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
