import './index.css';
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
    <div className="relative isolate min-h-screen bg-void text-text-primary">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Neural Network Background Effect */}
      <NeuralBackground />

      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content */}
      <main id="main-content" className="relative z-10 section-shell">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Projects Section */}
        <Projects />

        {/* AI/ML Section */}
        <AISection />

        {/* Systems Design Section */}
        <Systems />

        {/* Connect Section */}
        <Connect />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
