import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Send,
  Youtube,
} from 'lucide-react';
import { profile } from '../lib/data';

const socialLinks = [
  { name: 'GitHub', detail: '@Abhi8149', url: profile.github, icon: Github },
  { name: 'LinkedIn', detail: 'Let’s connect', url: profile.linkedin, icon: Linkedin },
  { name: 'Medium', detail: 'Notes on software', url: profile.medium, icon: BookOpen },
  { name: 'YouTube', detail: 'Project walkthroughs', url: profile.youtube, icon: Youtube },
];

export function Connect() {
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      setCopyStatus('error');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitStatus('idle');
    setSubmitMessage('');

    if (!formspreeEndpoint) {
      const subject = encodeURIComponent(formState.subject || 'Portfolio inquiry');
      const body = encodeURIComponent(`${formState.message}\n\nFrom: ${formState.name}\nEmail: ${formState.email}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setSubmitStatus('success');
      setSubmitMessage('Opening your email app with this message pre-filled.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formState),
      });
      if (!response.ok) throw new Error('Message request failed');

      setSubmitStatus('success');
      setSubmitMessage('Thanks — your message is on its way. I’ll get back to you soon.');
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
      setSubmitMessage(`The message could not be sent. Please email me directly at ${profile.email}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="connect" className="section-pad connect-section">
      <div className="container">
        <motion.div
          className="connect-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="section-kicker">05 · Start a conversation</span>
          <h2>Have a problem<br /><span>worth solving?</span></h2>
          <p>I’m always interested in ambitious products, applied AI, and collaborations with curious people.</p>
        </motion.div>

        <div className="connect-grid">
          <motion.div
            className="connect-direct"
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="direct-email-card">
              <span className="direct-email-card__label"><Mail size={16} /> Direct line</span>
              <a href={`mailto:${profile.email}`} className="direct-email-card__email">{profile.email}</a>
              <p>The simplest way to reach me. No forms, no friction — just tell me what you’re thinking.</p>
              <div className="direct-email-card__actions">
                <a href={`mailto:${profile.email}`} className="btn-primary">Write an email <ArrowUpRight size={16} /></a>
                <button type="button" className="btn-secondary" onClick={copyEmail}>
                  {copyStatus === 'copied' ? <Check size={16} /> : <Copy size={16} />}
                  {copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy unavailable' : 'Copy email'}
                </button>
              </div>
            </div>

            <div className="contact-social-grid">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="contact-social-card">
                  <link.icon size={20} />
                  <span><strong>{link.name}</strong><small>{link.detail}</small></span>
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>

            <a href={profile.resume} download className="contact-resume-link">
              <span><Download size={17} /> Want the concise version?</span>
              <strong>Download résumé <ArrowUpRight size={14} /></strong>
            </a>
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="contact-form__heading">
              <span>OR SEND A NOTE HERE</span>
              <span className="status-dot" aria-hidden="true" />
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <fieldset disabled={isSubmitting}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contact-name">Your name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      maxLength={80}
                      value={formState.name}
                      onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">Email address</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={120}
                      value={formState.email}
                      onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="contact-subject">What’s this about?</label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    maxLength={140}
                    value={formState.subject}
                    onChange={(event) => setFormState({ ...formState, subject: event.target.value })}
                    placeholder="A project, role, research idea..."
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">Your message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    maxLength={3000}
                    value={formState.message}
                    onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                    placeholder="A little context goes a long way..."
                  />
                </div>
                <button type="submit" className="btn-primary contact-form__submit" aria-busy={isSubmitting}>
                  {isSubmitting ? <span className="form-spinner" aria-hidden="true" /> : <Send size={16} />}
                  {isSubmitting ? 'Sending...' : 'Send inquiry'}
                </button>
              </fieldset>
              <p className={`form-status form-status--${submitStatus}`} role="status" aria-live="polite">
                {submitMessage}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
