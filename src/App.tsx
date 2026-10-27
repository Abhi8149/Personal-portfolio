import './index.css';
import { MotionConfig } from 'framer-motion';
import { NeuralBackground } from './components/NeuralBackground';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { AISection } from './components/AISection';
import { Systems } from './components/Systems';
import { Connect } from './components/Connect';
import { Footer } from './components/Footer';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <NeuralBackground />
        <Navigation />
        <main id="main-content" className="relative z-10" tabIndex={-1}>
          <Hero />
          <Projects />
          <About />
          <AISection />
          <Systems />
          <Connect />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
