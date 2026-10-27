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
              <span className="site-logo__mark">AS</span>
              <span className="site-logo__text">ABHINAV<span>/</span></span>
            </a>
            <p>Building intelligent systems for the real world.</p>
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
        <div className="footer-wordmark" aria-hidden="true">ABHINAV</div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {profile.fullName}. Built with React &amp; TypeScript.</p>
          <a href="#home">Back to top <ArrowUp size={14} /></a>
        </div>
      </div>
    </footer>
  );
}
