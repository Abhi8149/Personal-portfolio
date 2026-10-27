import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Menu, X, Youtube } from 'lucide-react';
import { profile } from '../lib/data';

const navLinks = [
  { href: '#projects', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#ai', label: 'AI / ML' },
  { href: '#systems', label: 'Systems' },
];

const sectionHrefs = ['#home', ...navLinks.map((link) => link.href), '#connect'];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateScrollState = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 24);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0);

      const readingPosition = window.scrollY + window.innerHeight * 0.35;
      let currentSection = '#home';
      sectionHrefs.forEach((href) => {
        const section = document.querySelector<HTMLElement>(href);
        if (section && section.offsetTop <= readingPosition) currentSection = href;
      });
      setActiveHref(currentSection);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstMobileLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === 'Tab') {
        const menu = document.getElementById('mobile-navigation');
        const menuItems = Array.from(
          menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
        );
        const menuButton = menuButtonRef.current;
        const lastItem = menuItems[menuItems.length - 1];
        if (!menuButton || !lastItem) return;

        if (event.shiftKey && document.activeElement === menuButton) {
          event.preventDefault();
          lastItem.focus();
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          menuButton.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setIsMobileMenuOpen(false);
    };
    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
        <nav className="container nav-shell" aria-label="Main navigation">
          <a href="#home" className="site-logo" onClick={() => setIsMobileMenuOpen(false)} aria-label="Abhinav — back to top">
            <span className="site-logo__mark">AS</span>
            <span className="site-logo__text">ABHINAV<span>/</span></span>
          </a>

          <div className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={activeHref === link.href ? 'is-active' : ''}
                aria-current={activeHref === link.href ? 'location' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="desktop-actions">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="nav-icon-link" aria-label="GitHub (opens in a new tab)">
              <Github size={18} />
            </a>
            <a href="#connect" className="nav-cta">Let&apos;s talk <ArrowUpRight size={15} /></a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-menu__inner">
              <span className="section-kicker">Navigate the portfolio</span>
              <div className="mobile-menu__links">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    href={link.href}
                    className={activeHref === link.href ? 'is-active' : ''}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.04 }}
                  >
                    <span>0{index + 1}</span>
                    {link.label}
                    <ArrowUpRight size={20} />
                  </motion.a>
                ))}
                <motion.a
                  href="#connect"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.23 }}
                >
                  <span>05</span>
                  Contact
                  <ArrowUpRight size={20} />
                </motion.a>
              </div>
              <div className="mobile-menu__footer">
                <p>AI/ML @ NIT Kurukshetra · Class of 2027</p>
                <div>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
                  <a href={profile.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={20} /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
