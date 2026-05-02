import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, BookOpen, ExternalLink, Send } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    username: '@Abhi8149',
    url: 'https://github.com/Abhi8149',
    icon: Github,
    color: 'hover:text-text-primary',
    description: '40+ repositories of shipped products',
  },
  {
    name: 'LinkedIn',
    username: 'Abhinav Shivkumar',
    url: 'https://linkedin.com/in/abhinav-shivkumar-a00b35290',
    icon: Linkedin,
    color: 'hover:text-[#0077b5]',
    description: "Let's connect professionally",
  },
  {
    name: 'Medium',
    username: '@abhinavjyoti09',
    url: 'https://medium.com/@abhinavjyoti09',
    icon: BookOpen,
    color: 'hover:text-[#00ab6c]',
    description: 'Writing about AI and tech',
  },
];

export function Connect() {
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formspreeEndpoint) {
      setSubmitStatus('error');
      setSubmitMessage('Form service is not configured yet. Please try again later.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Formspree request failed');
      }

      setSubmitStatus('success');
      setSubmitMessage('Thanks! Your message was sent successfully.');
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Message could not be sent. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="connect"
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
            The Best Code is Written <span className="text-gradient">Together</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Let's build something that matters
          </p>
        </div>

        {/* Interest Cards */}
        <div
          className={`mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="card p-6 md:p-8 text-center">
            <p className="text-lg text-text-primary mb-4">
              I'm always interested in:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Collaborations on interesting problems',
                'Real-world AI/ML challenges',
                'Building products that matter',
              ].map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full bg-circuit border border-border-light text-text-secondary"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="card p-6 md:p-8">
              <h3 className="font-display font-semibold text-xl mb-6">
                Write Something
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-text-muted mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="input-field"
                    placeholder="What should I call you?"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-text-muted mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm text-text-muted mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="input-field"
                    placeholder="Collaboration, internship, product idea..."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-text-muted mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="input-field resize-none"
                    placeholder="What's on your mind? A project idea? A collaboration? Or just want to say hi?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
                {submitStatus !== 'idle' && (
                  <p
                    className={`text-sm ${
                      submitStatus === 'success' ? 'text-[#00ab6c]' : 'text-rose-400'
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Social Links */}
          <div
            className={`space-y-4 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-4 group hover:border-indigo/50"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo/20 to-purple/20 flex items-center justify-center flex-shrink-0 group-hover:from-indigo/30 group-hover:to-purple/30 transition-all">
                  <link.icon
                    size={28}
                    className={`text-text-secondary ${link.color} transition-colors`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-1 group-hover:text-indigo transition-colors">
                    {link.name}
                  </h4>
                  <p className="text-sm text-text-secondary">{link.description}</p>
                  <p className="text-xs text-text-muted">{link.username}</p>
                </div>
                <ExternalLink
                  size={18}
                  className="text-text-muted group-hover:text-indigo transition-colors"
                />
              </a>
            ))}

            {/* Email */}
            <a
              href="mailto:abhinavshivkumar03@gmail.com"
              className="card flex items-center gap-4 group hover:border-indigo/50"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo/20 to-purple/20 flex items-center justify-center flex-shrink-0 group-hover:from-indigo/30 group-hover:to-purple/30 transition-all">
                <Mail size={28} className="text-text-secondary group-hover:text-indigo transition-colors" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-semibold mb-1 group-hover:text-indigo transition-colors">
                  Email
                </h4>
                <p className="text-sm text-text-secondary">Direct and personal</p>
                <p className="text-xs text-text-muted">abhinavshivkumar03@gmail.com</p>
              </div>
              <ExternalLink
                size={18}
                className="text-text-muted group-hover:text-indigo transition-colors"
              />
            </a>

            {/* External Presence */}
            <div className="card p-6 text-center">
              <p className="text-text-secondary mb-4">Also find me on</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://codolio.com/profile/zujIx7WJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-circuit hover:bg-indigo/20 text-text-secondary hover:text-indigo transition-colors text-sm font-mono"
                >
                  Codolio
                </a>
                <a
                  href="public/Machine_learning_and_deep_learning_resume.pdf"
                  download
                  className="px-4 py-2 rounded-lg bg-circuit hover:bg-indigo/20 text-text-secondary hover:text-indigo transition-colors text-sm font-mono"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
