import { motion } from 'framer-motion';
import { ArrowUp, BookOpen, Github, Linkedin, Youtube } from 'lucide-react';
import { profile } from '../lib/data';

const footerLinks = [
  { label: 'GitHub', href: profile.github, icon: Github },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'Medium', href: profile.medium, icon: BookOpen },
  { label: 'YouTube', href: profile.youtube, icon: Youtube },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a href="#home" className="site-logo" aria-label="Back to top">
              <img src={profile.photo} alt="" width={36} height={36} loading="lazy" className="footer-avatar" />
              <span className="site-logo__text">ABHINAV<span>/</span></span>
            </a>
            <p>Building intelligent systems for the real world. Open to hire — say hello.</p>
          </div>
          <div className="footer-socials">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} (opens in a new tab)`}>
                <link.icon size={18} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
        <motion.div
          className="footer-wordmark"
          aria-hidden="true"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          ABHINAV
        </motion.div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {profile.fullName}. Built with React &amp; TypeScript.</p>
          <a href="#home">Back to top <ArrowUp size={14} /></a>
        </div>
      </div>
    </footer>
  );
}
