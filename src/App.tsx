import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import HeroAnimation from './components/HeroAnimation';
import Footer from './components/Footer';

// Lazy load sections below the fold
const DestinationSection = lazy(() => import('./components/DestinationSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const TrustSection = lazy(() => import('./components/TrustSection'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));

const App: React.FC = () => {
  return (
    <main>
      <Navbar />
      <HeroAnimation />
      
      <Suspense fallback={<div className="section-loader" style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>Loading Experience...</div>}>
        <DestinationSection />
        <ExperienceSection />
        <TrustSection />
        <Testimonials />
        <FinalCTA />
      </Suspense>

      <Footer />
    </main>
  );
};

export default App;
