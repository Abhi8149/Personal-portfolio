import { Github, Linkedin, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border-light">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Copyright */}
          <div className="text-center md:text-left">
            <p className="text-text-secondary text-sm">
              © {new Date().getFullYear()} Abhinav Shivkumar Ovhal
            </p>
            <p className="text-text-muted text-xs mt-1">
              Built with React + TypeScript, deployed with Vercel
            </p>
          </div>

          {/* Center - Quote */}
          <div className="text-center">
            <p className="text-text-muted italic text-sm">
              "The best way to predict the future is to build it."
            </p>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Abhi8149"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-circuit hover:bg-indigo/20 text-text-secondary hover:text-indigo transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/abhinav-shivkumar-a00b35290"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-circuit hover:bg-indigo/20 text-text-secondary hover:text-indigo transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://medium.com/@abhinavjyoti09"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-circuit hover:bg-indigo/20 text-text-secondary hover:text-indigo transition-colors"
              aria-label="Medium"
            >
              <BookOpen size={20} />
            </a>
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-8">
          <p className="text-text-muted text-xs flex items-center justify-center gap-1">
            Crafted with
            <span className="text-red-500 animate-pulse">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            and neural networks
          </p>
        </div>
      </div>
    </footer>
  );
}
