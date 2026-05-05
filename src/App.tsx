import Navbar from './components/Navbar';
import HeroAnimation from './components/HeroAnimation';
import DynamicContent from './components/DynamicContent';
import DestinationSection from './components/DestinationSection';
import ExperienceSection from './components/ExperienceSection';
import TrustSection from './components/TrustSection';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <main>
      <Navbar />
      <HeroAnimation />
      <DestinationSection />
      <ExperienceSection />
      <TrustSection />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default App;
