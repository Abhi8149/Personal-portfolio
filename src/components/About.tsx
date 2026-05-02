import { useEffect, useRef, useState } from 'react';
import { Brain, Rocket, Gamepad2, BookOpen, PenTool } from 'lucide-react';

const interests = [
  {
    icon: Gamepad2,
    title: 'Chess',
    description: 'Strategic thinking meets algorithmic planning. Every game is a system design problem.',
  },
  {
    icon: PenTool,
    title: 'Writing',
    description: 'Sharing AI concepts on Medium to make complex ideas accessible for the next generation of builders.',
  },
  {
    icon: BookOpen,
    title: 'Research',
    description: 'Reading papers on diffusion models, LLMs, and transformers — understanding the math behind the magic.',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen py-24 md:py-32 px-6 relative"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title mb-4">
            Beyond The <span className="text-gradient">Code</span>
          </h2>
          <p className="section-subtitle mx-auto">
            The story behind the systems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Story */}
          <div
            className={`space-y-8 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Profile visual */}
            <div className="relative">
              <div className="w-48 h-48 mx-auto lg:mx-0 rounded-2xl bg-gradient-to-br from-indigo via-purple to-cyan p-1">
                <div className="w-full h-full rounded-2xl bg-neural flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-indigo to-purple flex items-center justify-center">
                      <span className="text-3xl font-display font-bold text-white">AS</span>
                    </div>
                    <span className="text-sm text-text-muted">Abhinav Shivkumar</span>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-indigo/30 rounded-xl rotate-12" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-cyan/30 rounded-lg -rotate-6" />
            </div>

            {/* The Doer's Story */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-display font-semibold text-xl mb-3">The Doer's Story</h3>
                <p className="text-text-secondary mb-3">
                  While others debated whether they should start, I had already deployed my first app.
                  I saw local shopkeepers around me struggling to reach nearby customers and built Availo to close that gap.
                </p>
                <p className="text-text-secondary">
                  That's how I work: find a real problem, design a real system, and ship a real product.
                  Not tutorial clones. Not theory-only projects. Products that run in the wild.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="text-indigo" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">Systems That Solve Real Problems</h3>
                  <p className="text-text-secondary">
                    I study AI/ML at NIT Kurukshetra because I want to push what's possible.
                    Not just use tools, but understand them at the mathematical level.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center flex-shrink-0">
                  <Rocket className="text-purple" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">From Idea to Deployed Product</h3>
                  <p className="text-text-secondary">
                    Availo connects local shopkeepers with customers in their own neighborhood.
                    It started as a local observation and turned into a live product with real users.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Philosophy & Interests */}
          <div
            className={`space-y-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Philosophy Statement */}
            <div className="card gradient-border">
              <blockquote className="text-xl md:text-2xl font-display font-medium text-text-primary leading-relaxed">
                "I didn't wait for permission to build."
              </blockquote>
              <p className="mt-4 text-text-secondary">
                That's my approach to everything: identify a real problem, build a real solution,
                ship a real product. Not a portfolio project. Not a tutorial follow-through.
                <span className="text-indigo"> A thing that works.</span>
              </p>
            </div>

            {/* The Researcher */}
            <div className="card">
              <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                <BookOpen className="text-cyan" size={20} />
                The Researcher
              </h3>
              <p className="text-text-secondary">
                I read research papers on diffusion models and LLMs not because I have to,
                but because understanding the math behind the magic makes me a better builder.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Diffusion Models', 'Transformers', 'LLM Architecture', 'GAN Theory'].map((topic) => (
                  <span key={topic} className="badge badge-tech text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests Grid */}
            <div className="grid gap-4">
              {interests.map((interest, index) => (
                <div
                  key={interest.title}
                  className="card flex items-start gap-4"
                  style={{
                    transitionDelay: `${300 + index * 100}ms`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo/20 to-purple/20 flex items-center justify-center flex-shrink-0">
                    <interest.icon className="text-indigo" size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold mb-1">{interest.title}</h4>
                    <p className="text-sm text-text-secondary">{interest.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '40+', label: 'Repositories' },
            { value: '9+', label: 'LLD Systems' },
            { value: '500+', label: 'DSA Problems' },
            { value: '5+', label: 'Products Shipped' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-neural/50 border border-border-light"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
