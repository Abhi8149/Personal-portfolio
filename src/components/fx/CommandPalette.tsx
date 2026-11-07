import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Briefcase, Code2, Copy, Download, Github, Linkedin, Mail, Search, Sparkles, User, Wrench, X, Youtube } from 'lucide-react';
import { profile } from '../../lib/data';

type Action = {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  icon: typeof Briefcase;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = useMemo(() => {
    const go = (hash: string) => () => {
      setOpen(false);
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    };
    const openUrl = (url: string) => () => { setOpen(false); window.open(url, '_blank', 'noopener'); };
    return [
      { id: 'work', label: 'View selected work', hint: 'Section', keywords: 'projects work portfolio', icon: Briefcase, run: go('#projects') },
      { id: 'about', label: 'About Abhinav', hint: 'Section', keywords: 'about bio nit', icon: User, run: go('#about') },
      { id: 'ai', label: 'AI / ML lab', hint: 'Section', keywords: 'ai ml research ethereum gnn', icon: Sparkles, run: go('#ai') },
      { id: 'systems', label: 'Systems & LLD explorer', hint: 'Section', keywords: 'systems lld design architecture skills', icon: Wrench, run: go('#systems') },
      { id: 'contact', label: 'Start a conversation', hint: 'Section', keywords: 'contact hire email', icon: Mail, run: go('#connect') },
      { id: 'resume', label: 'Download résumé', hint: 'PDF', keywords: 'resume cv download hire', icon: Download, run: () => { setOpen(false); const a = document.createElement('a'); a.href = profile.resume; a.download = ''; a.click(); } },
      { id: 'github', label: 'Open GitHub — @Abhi8149', hint: 'External', keywords: 'github code repos', icon: Github, run: openUrl(profile.github) },
      { id: 'linkedin', label: 'Open LinkedIn', hint: 'External', keywords: 'linkedin connect hire', icon: Linkedin, run: openUrl(profile.linkedin) },
      { id: 'youtube', label: 'Watch project demos on YouTube', hint: 'External', keywords: 'youtube video demo', icon: Youtube, run: openUrl(profile.youtube) },
      { id: 'email', label: 'Copy email address', hint: profile.email, keywords: 'email copy mail contact', icon: Copy, run: () => { void navigator.clipboard?.writeText(profile.email); setOpen(false); } },
      { id: 'code', label: 'Jump to AbhiClaw project', hint: 'Project', keywords: 'abhiclaw agent coding ai', icon: Code2, run: go('#projects') },
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.keywords} ${a.hint}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => { setIndex(0); }, [query, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open ]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && filtered[index]) filtered[index].run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="cmdk-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div
            className="cmdk-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmdk-input-row">
              <Search size={18} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search work, résumé, GitHub, contact…"
                aria-label="Search commands"
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close command palette"><X size={17} /></button>
            </div>
            <div className="cmdk-list" role="listbox">
              {filtered.length === 0 && <p className="cmdk-empty">No matches. Try “resume”, “github”, or “hire”.</p>}
              {filtered.map((action, i) => (
                <button
                  key={action.id}
                  type="button"
                  role="option"
                  aria-selected={i === index}
                  className={`cmdk-item ${i === index ? 'is-active' : ''}`}
                  onMouseEnter={() => setIndex(i)}
                  onClick={action.run}
                >
                  <action.icon size={17} />
                  <span>{action.label}</span>
                  <small>{action.hint}</small>
                  <ArrowUpRight size={14} />
                </button>
              ))}
            </div>
            <div className="cmdk-footer"><span>↑↓ Navigate</span><span>↵ Select</span><span>Esc Close</span><span className="cmdk-hire">Open to internships & AI roles</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
