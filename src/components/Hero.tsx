import { useEffect, useState } from 'react';
import { Rocket, Download, ArrowDown } from 'lucide-react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);
  const typedWords = ['Ship', 'Deploy', 'Scale'];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTypedIndex((prev) => (prev + 1) % typedWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-6 pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto text-center relative z-10 max-w-5xl">
        {/* Status badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo/30 bg-indigo/10 mb-8 transition-all duration-700 reveal ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
          </span>
          <span className="text-sm text-text-secondary">AI/ML @ NIT Kurukshetra</span>
        </div>

        {/* Main heading */}
        <h1
          className={`font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-4 transition-all duration-700 delay-100 reveal ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Hi, I'm <span className="text-gradient">Abhinav</span>
        </h1>

        {/* Subheading */}
        <h2
          className={`font-display font-semibold text-2xl md:text-4xl lg:text-5xl text-text-secondary mb-5 transition-all duration-700 delay-200 reveal ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          I build systems that <span className="text-gradient">ship</span>
          <span className="font-mono text-cyan ml-2 text-lg md:text-2xl inline-block min-w-[85px] text-left">
            {typedWords[typedIndex]}
          </span>
        </h2>

        <div className="signal-line max-w-lg mx-auto mb-6" aria-hidden="true" />

        {/* Description */}
        <p
          className={`text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8 transition-all duration-700 delay-300 reveal ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          I'm Abhinav Shivkumar, an AI/ML student who doesn't just study intelligent systems but builds them.
          From neural networks to local networks, I turn ideas into products people can actually use.
          <span className="text-text-primary"> I don't just design, I deploy.</span>
        </p>

        {/* Achievement badges */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 mb-12 transition-all duration-700 delay-400 reveal ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="badge badge-shipped">
            <Rocket size={12} />
            5+ Products Shipped
          </span>
          <span className="badge badge-live">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            40+ GitHub Repos
          </span>
          <span className="badge badge-progress">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            9+ LLD Systems
          </span>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 reveal ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button onClick={scrollToProjects} className="btn-primary flex items-center gap-2">
            Explore My Work
            <ArrowDown size={18} />
          </button>
          <a
            href="public/Machine_learning_and_deep_learning_resume.pdf"
            download
            className="btn-secondary flex items-center gap-2"
          >
            Download Resume
            <Download size={18} />
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-text-muted animate-bounce">
            {/* <span className="text-xs">Scroll to explore</span>
            <ArrowDown size={20} /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
