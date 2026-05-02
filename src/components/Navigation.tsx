import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, BookOpen } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#ai', label: 'AI/ML' },
  { href: '#systems', label: 'Systems' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#about');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.45 }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-3' : 'py-5'
        }`}
      >
        <div
          className="absolute left-0 top-0 h-[2px] bg-gradient-primary transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="#6366f1" className="group-hover:fill-purple transition-colors" />
                <circle cx="35" cy="40" r="8" fill="#06b6d4" />
                <circle cx="65" cy="40" r="8" fill="#06b6d4" />
                <circle cx="50" cy="65" r="8" fill="#06b6d4" />
                <line x1="35" y1="40" x2="65" y2="40" stroke="#8b5cf6" strokeWidth="3" />
                <line x1="35" y1="40" x2="50" y2="65" stroke="#8b5cf6" strokeWidth="3" />
                <line x1="65" y1="40" x2="50" y2="65" stroke="#8b5cf6" strokeWidth="3" />
              </svg>
            </div>
            <span className="font-display font-semibold text-lg text-text-primary hidden sm:block">
              Abhinav
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`nav-link relative hover:text-indigo transition-colors ${
                  activeHref === link.href ? 'text-text-primary' : ''
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-gradient-primary transition-all duration-300 ${
                    activeHref === link.href ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/Abhi8149"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-indigo transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/abhinav-shivkumar-a00b35290"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-indigo transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://medium.com/@abhinavjyoti09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-indigo transition-colors"
              aria-label="Medium"
            >
              <BookOpen size={20} />
            </a>
            <button
              onClick={() => scrollToSection('#connect')}
              className="btn-primary text-sm"
            >
              Let's Build
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-text-primary p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-void/95 backdrop-blur-lg md:hidden transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`text-2xl font-display font-semibold transition-colors ${
                activeHref === link.href ? 'text-indigo' : 'text-text-primary hover:text-indigo'
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => scrollToSection('#connect')}
            className="btn-primary mt-2"
          >
            Let's Build Together
          </button>

          <div className="flex items-center gap-6 mt-8">
            <a
              href="https://github.com/Abhi8149"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-indigo transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/abhinav-shivkumar-a00b35290"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-indigo transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://medium.com/@abhinavjyoti09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-indigo transition-colors"
            >
              <BookOpen size={24} />
            </a>
            <a
              href="mailto:abhinavshivkumar03@gmail.com"
              className="text-text-secondary hover:text-indigo transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
