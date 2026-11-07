import { useEffect, useRef, useState, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ---------------- Custom cursor (fine pointers only) ---------------- */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], input, textarea, summary, canvas, [data-cursor]');
      const label = target?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor;
      if (ringRef.current) {
        ringRef.current.dataset.active = interactive ? 'true' : 'false';
        ringRef.current.dataset.label = label ?? '';
        const labelEl = ringRef.current.querySelector('span');
        if (labelEl) labelEl.textContent = label ?? '';
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  return (
    <>
      <motion.div ref={dotRef} className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div ref={ringRef} className="cursor-ring" style={{ x: ringX, y: ringY }} aria-hidden="true">
        <span />
      </motion.div>
    </>
  );
}

/* ---------------- Magnetic hover wrapper ---------------- */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Animated counter (counts up when visible) ---------------- */
export function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState(0);
  // Fallback: never leave a counter stuck at 0 if the visitor jump-scrolls past it.
  const [forced, setForced] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setForced(true), 1400);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!inView && !forced) return;
    const controls = animate(0, value, {
      duration: 1.6,
      delay: 0.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, forced, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

/* ---------------- Rotating role word (vertical flip) ---------------- */
export function RotatingWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="rotating-word">
      <motion.span
        key={words[index]}
        className="rotating-word__item"
        initial={{ y: '105%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      >
        {words[index]}
      </motion.span>
    </span>
  );
}

/* ---------------- 3D tilt + spotlight glare card ---------------- */
export function Tilt({
  children,
  className = '',
  max = 7,
  scale = 1.015,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const s = useMotionValue(1);
  const sRx = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.5 });
  const sRy = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.5 });
  const sScale = useSpring(s, { stiffness: 220, damping: 18 });
  const transform = useTransform(
    [sRx, sRy, sScale],
    ([a, b, c]) => `perspective(900px) rotateX(${a}deg) rotateY(${b}deg) scale(${c})`,
  );

  const onMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    s.set(scale);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--glare-opacity', '1');
  };
  const onLeave = () => {
    rx.set(0); ry.set(0); s.set(1);
    ref.current?.style.setProperty('--glare-opacity', '0');
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </motion.div>
  );
}
