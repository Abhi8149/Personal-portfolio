import { Suspense, lazy, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Minus, Orbit, Pause, Play, Plus, RotateCcw } from 'lucide-react';
import type { CoreMode } from './three/Hero3D';

const Hero3D = lazy(() => import('./three/Hero3D').then((m) => ({ default: m.Hero3D })));
const AmbientField = lazy(() => import('./three/Hero3D').then((m) => ({ default: m.AmbientField })));

const MODES: { id: CoreMode; shortLabel: string }[] = [
  { id: 'agent', shortLabel: 'Agent' },
  { id: 'graph', shortLabel: 'GNN' },
  { id: 'commerce', shortLabel: 'Commerce' },
];

const MODE_DETAILS: Record<CoreMode, { label: string; title: string; caption: string; color: string }> = {
  agent: { label: 'Agentic core', title: 'Plan. Act. Verify.', caption: 'Human-in-the-loop systems', color: '#c8fa55' },
  graph: { label: 'Risk graph', title: 'Signals in the noise.', caption: 'Graph machine learning', color: '#58d7e5' },
  commerce: { label: 'Local mesh', title: 'Shops meet neighborhoods.', caption: 'Connected local commerce', color: '#a78bfa' },
};

export function NeuralBackground() {
  return (
    <div className="site-ambient" aria-hidden="true">
      <div className="site-ambient__grid" />
      <Suspense fallback={null}><AmbientField /></Suspense>
      <div className="site-ambient__glow site-ambient__glow--one" />
      <div className="site-ambient__glow site-ambient__glow--two" />
      <div className="site-ambient__noise" />
    </div>
  );
}

export function InteractiveNeuralCore() {
  const [mode, setMode] = useState<CoreMode>('agent');
  const [isPlaying, setIsPlaying] = useState(() => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [zoom, setZoom] = useState(1);
  const [spin, setSpin] = useState({ x: 0, y: 0 });
  const [resetKey, setResetKey] = useState(0);
  const details = MODE_DETAILS[mode];

  const adjustZoom = (amount: number) => setZoom((z) => Math.min(1.3, Math.max(0.72, +(z + amount).toFixed(2))));
  const resetView = () => { setZoom(1); setSpin({ x: 0, y: 0 }); setResetKey((k) => k + 1); };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const actions: Record<string, () => void> = {
      ArrowLeft: () => setSpin((s) => ({ ...s, y: s.y - 0.35 })),
      ArrowRight: () => setSpin((s) => ({ ...s, y: s.y + 0.35 })),
      ArrowUp: () => setSpin((s) => ({ ...s, x: s.x - 0.25 })),
      ArrowDown: () => setSpin((s) => ({ ...s, x: s.x + 0.25 })),
      '+': () => adjustZoom(0.1),
      '=': () => adjustZoom(0.1),
      '-': () => adjustZoom(-0.1),
      Home: resetView,
      ' ': () => setIsPlaying((p) => !p),
    };
    const action = actions[event.key];
    if (action) { event.preventDefault(); action(); }
  };

  return (
    <div className="core-panel">
      <div className="core-panel__header">
        <span className="core-panel__status">
          <span className="status-dot" aria-hidden="true" />
          Interactive systems core
        </span>
        <span className="font-mono text-xs text-text-muted">WEBGL · LIVE</span>
      </div>

      <div
        className="core-canvas-wrap"
        tabIndex={0}
        role="application"
        aria-label="Interactive 3D neural core. Drag to orbit, arrow keys to rotate, plus and minus to zoom, Space to pause."
        onKeyDown={handleKeyDown}
        data-cursor="Drag"
      >
        <Suspense fallback={<div className="core-loading" aria-hidden="true"><span /></div>}>
          <Hero3D mode={mode} playing={isPlaying} zoom={zoom} spin={spin} resetKey={resetKey} />
        </Suspense>
        <div className="core-coordinate core-coordinate--top" aria-hidden="true">Y +1.0 · X / Z</div>
        <span className="float-chip float-chip--tr" aria-hidden="true"><i />0.850 AUC-ROC</span>
        <span className="float-chip float-chip--bl" aria-hidden="true">500+ DSA solved</span>
        <span className="float-chip float-chip--br" aria-hidden="true">40+ repos</span>
      </div>

      <div className="core-panel__readout" aria-live="polite">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: details.color }}>
          {details.label}
        </span>
        <strong>{details.title}</strong>
        <span>{details.caption} — drag the core, it reacts to your cursor.</span>
      </div>

      <div className="core-panel__controls">
        <div className="core-mode-switch" role="group" aria-label="Visualization model">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={mode === item.id ? 'is-active' : ''}
              aria-pressed={mode === item.id}
              onClick={() => setMode(item.id)}
            >
              {item.shortLabel}
            </button>
          ))}
        </div>
        <div className="core-icon-actions" role="group" aria-label="3D view controls">
          <button type="button" onClick={() => adjustZoom(-0.1)} aria-label="Zoom out"><Minus size={15} /></button>
          <button type="button" onClick={() => adjustZoom(0.1)} aria-label="Zoom in"><Plus size={15} /></button>
          <button type="button" onClick={() => setIsPlaying((p) => !p)} aria-label={isPlaying ? 'Pause rotation' : 'Resume rotation'}>
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button type="button" onClick={resetView} aria-label="Reset 3D view"><RotateCcw size={15} /></button>
        </div>
      </div>

      <p className="core-panel__hint">
        <Orbit size={13} aria-hidden="true" />
        Drag to orbit · Scroll-safe · Arrow keys when focused
      </p>
    </div>
  );
}
