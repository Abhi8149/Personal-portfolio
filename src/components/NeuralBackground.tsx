import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Minus, Orbit, Pause, Play, Plus, RotateCcw } from 'lucide-react';

type CoreMode = 'agent' | 'graph' | 'commerce';

interface CoreNode {
  x: number;
  y: number;
  z: number;
  size: number;
}

interface CoreConnection {
  from: number;
  to: number;
  strength: number;
}

interface CoreModel {
  nodes: CoreNode[];
  connections: CoreConnection[];
}

interface ProjectedNode {
  x: number;
  y: number;
  z: number;
  scale: number;
}

const MODES: { id: CoreMode; shortLabel: string }[] = [
  { id: 'agent', shortLabel: 'Agent' },
  { id: 'graph', shortLabel: 'GNN' },
  { id: 'commerce', shortLabel: 'Commerce' },
];

const MODE_DETAILS: Record<
  CoreMode,
  { label: string; title: string; caption: string; color: string; secondary: string; offset: number }
> = {
  agent: {
    label: 'Agentic core',
    title: 'Plan. Act. Verify.',
    caption: 'Human-in-the-loop systems',
    color: '#c8fa55',
    secondary: '#a78bfa',
    offset: 0,
  },
  graph: {
    label: 'Risk graph',
    title: 'Signals in the noise.',
    caption: 'Graph machine learning',
    color: '#58d7e5',
    secondary: '#c8fa55',
    offset: 0.8,
  },
  commerce: {
    label: 'Local mesh',
    title: 'Shops meet neighborhoods.',
    caption: 'Connected local commerce',
    color: '#a78bfa',
    secondary: '#c8fa55',
    offset: 1.6,
  },
};

function createModel(mode: CoreMode, isMobile: boolean): CoreModel {
  const nodes: CoreNode[] = [];
  const sphereNodeCount = isMobile ? 46 : 68;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const offset = MODE_DETAILS[mode].offset;

  for (let index = 0; index < sphereNodeCount; index += 1) {
    const y = 1 - (index / (sphereNodeCount - 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index + offset;

    nodes.push({
      x: Math.cos(theta) * ringRadius,
      y,
      z: Math.sin(theta) * ringRadius,
      size: index % 11 === 0 ? 2.5 : 1.35,
    });
  }

  const ringNodeCount = mode === 'graph' ? 10 : 16;
  for (let index = 0; index < ringNodeCount; index += 1) {
    const angle = (index / ringNodeCount) * Math.PI * 2 + offset;
    const radius = mode === 'commerce' ? 1.32 : 1.22;
    nodes.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle * 2) * 0.12,
      z: Math.sin(angle) * radius,
      size: index % 4 === 0 ? 2.3 : 1.15,
    });
  }

  const connections: CoreConnection[] = [];
  for (let from = 0; from < nodes.length; from += 1) {
    for (let to = from + 1; to < nodes.length; to += 1) {
      const dx = nodes[from].x - nodes[to].x;
      const dy = nodes[from].y - nodes[to].y;
      const dz = nodes[from].z - nodes[to].z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const isOuterNode = from >= sphereNodeCount || to >= sphereNodeCount;
      const threshold = isOuterNode ? 0.72 : 0.53;

      if (distance < threshold) {
        connections.push({ from, to, strength: 1 - distance / threshold });
      }
    }
  }

  return { nodes, connections };
}

function colorWithAlpha(hex: string, alpha: number) {
  const red = Number.parseInt(hex.slice(1, 3), 16);
  const green = Number.parseInt(hex.slice(3, 5), 16);
  const blue = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function NeuralBackground() {
  return (
    <div className="site-ambient" aria-hidden="true">
      <div className="site-ambient__grid" />
      <div className="site-ambient__glow site-ambient__glow--one" />
      <div className="site-ambient__glow site-ambient__glow--two" />
    </div>
  );
}

export function InteractiveNeuralCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: -0.24, y: 0.55 });
  const dragRef = useRef({ active: false, x: 0, y: 0 });
  const zoomRef = useRef(1);
  const dirtyRef = useRef(true);
  const visibleRef = useRef(true);
  const modeRef = useRef<CoreMode>('agent');
  const playingRef = useRef(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [mode, setMode] = useState<CoreMode>('agent');
  const [isPlaying, setIsPlaying] = useState(playingRef.current);

  const details = MODE_DETAILS[mode];

  const selectMode = (nextMode: CoreMode) => {
    modeRef.current = nextMode;
    setMode(nextMode);
    dirtyRef.current = true;
  };

  const togglePlaying = () => {
    const nextValue = !playingRef.current;
    playingRef.current = nextValue;
    setIsPlaying(nextValue);
    dirtyRef.current = true;
  };

  const adjustZoom = (amount: number) => {
    zoomRef.current = Math.min(1.25, Math.max(0.78, zoomRef.current + amount));
    dirtyRef.current = true;
  };

  const resetView = () => {
    rotationRef.current = { x: -0.24, y: 0.55 };
    zoomRef.current = 1;
    dirtyRef.current = true;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { active: true, x: event.clientX, y: event.clientY };
    dirtyRef.current = true;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.active) return;
    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;
    rotationRef.current.y += deltaX * 0.008;
    rotationRef.current.x = Math.min(
      1.15,
      Math.max(-1.15, rotationRef.current.x + deltaY * 0.008),
    );
    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;
    dirtyRef.current = true;
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dirtyRef.current = true;
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLCanvasElement>) => {
    const keyActions: Record<string, () => void> = {
      ArrowLeft: () => { rotationRef.current.y -= 0.12; },
      ArrowRight: () => { rotationRef.current.y += 0.12; },
      ArrowUp: () => { rotationRef.current.x -= 0.12; },
      ArrowDown: () => { rotationRef.current.x += 0.12; },
      '+': () => adjustZoom(0.08),
      '=': () => adjustZoom(0.08),
      '-': () => adjustZoom(-0.08),
      Home: resetView,
      ' ': togglePlaying,
    };
    const action = keyActions[event.key];
    if (action) {
      event.preventDefault();
      action();
      dirtyRef.current = true;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const isMobile = window.innerWidth < 768;
    const frameInterval = 1000 / (isMobile ? 30 : 60);
    const viewport = { width: 0, height: 0 };
    let model = createModel(modeRef.current, isMobile);
    let renderedMode = modeRef.current;
    let frameId = 0;
    let lastFrame = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      viewport.width = bounds.width;
      viewport.height = bounds.height;
      canvas.width = Math.round(bounds.width * pixelRatio);
      canvas.height = Math.round(bounds.height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      dirtyRef.current = true;
    };

    const draw = (time: number) => {
      const { width, height } = viewport;
      if (!width || !height) return;

      const currentDetails = MODE_DETAILS[renderedMode];
      const radius = Math.min(width, height) * 0.32;
      const centerX = width / 2;
      const centerY = height / 2;
      const zoom = zoomRef.current;
      const rotation = rotationRef.current;
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);

      context.clearRect(0, 0, width, height);

      const halo = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.35);
      halo.addColorStop(0, colorWithAlpha(currentDetails.color, 0.11));
      halo.addColorStop(0.5, colorWithAlpha(currentDetails.secondary, 0.035));
      halo.addColorStop(1, colorWithAlpha(currentDetails.color, 0));
      context.fillStyle = halo;
      context.fillRect(0, 0, width, height);

      const projected: ProjectedNode[] = model.nodes.map((node) => {
        const rotatedX = node.x * cosY - node.z * sinY;
        const zAfterY = node.x * sinY + node.z * cosY;
        const rotatedY = node.y * cosX - zAfterY * sinX;
        const rotatedZ = node.y * sinX + zAfterY * cosX;
        const perspective = 2.9 / (2.9 - rotatedZ);

        return {
          x: centerX + rotatedX * radius * perspective * zoom,
          y: centerY + rotatedY * radius * perspective * zoom,
          z: rotatedZ,
          scale: perspective,
        };
      });

      context.lineWidth = 0.7;
      model.connections.forEach((connection) => {
        const from = projected[connection.from];
        const to = projected[connection.to];
        const depth = Math.max(0, Math.min(1, ((from.z + to.z) / 2 + 1.4) / 2.8));
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = colorWithAlpha(
          currentDetails.color,
          (0.035 + depth * 0.2) * (0.45 + connection.strength * 0.55),
        );
        context.stroke();
      });

      if (playingRef.current && model.connections.length) {
        const pulseDuration = 1300;
        const pulseIndex = Math.floor(time / pulseDuration) % model.connections.length;
        const pulseProgress = (time % pulseDuration) / pulseDuration;
        const connection = model.connections[pulseIndex];
        const from = projected[connection.from];
        const to = projected[connection.to];
        context.beginPath();
        context.arc(
          from.x + (to.x - from.x) * pulseProgress,
          from.y + (to.y - from.y) * pulseProgress,
          2.1,
          0,
          Math.PI * 2,
        );
        context.fillStyle = currentDetails.secondary;
        context.fill();
      }

      const drawOrder = projected
        .map((node, index) => ({ node, index }))
        .sort((a, b) => a.node.z - b.node.z);

      drawOrder.forEach(({ node, index }) => {
        const depth = Math.max(0.15, Math.min(1, (node.z + 1.35) / 2.7));
        const sourceNode = model.nodes[index];
        context.beginPath();
        context.arc(node.x, node.y, sourceNode.size * node.scale, 0, Math.PI * 2);
        context.fillStyle = colorWithAlpha(
          index % 9 === 0 ? currentDetails.secondary : currentDetails.color,
          0.25 + depth * 0.75,
        );
        context.fill();
      });

      context.beginPath();
      context.arc(centerX, centerY, 4.5, 0, Math.PI * 2);
      context.fillStyle = currentDetails.secondary;
      context.fill();
    };

    const animate = (time: number) => {
      frameId = window.requestAnimationFrame(animate);
      if (time - lastFrame < frameInterval) return;
      const deltaFrames = Math.min(2, (time - lastFrame) / (1000 / 60));
      lastFrame = time;
      if (!visibleRef.current || document.hidden) return;

      if (renderedMode !== modeRef.current) {
        renderedMode = modeRef.current;
        model = createModel(renderedMode, isMobile);
        dirtyRef.current = true;
      }

      if (playingRef.current && !dragRef.current.active) {
        rotationRef.current.y += 0.0032 * deltaFrames;
      }

      if (playingRef.current || dragRef.current.active || dirtyRef.current) {
        draw(time);
        dirtyRef.current = false;
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        dirtyRef.current = true;
      },
      { rootMargin: '120px' },
    );

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    resize();
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <div className="core-panel">
      <div className="core-panel__header">
        <span className="core-panel__status">
          <span className="status-dot" aria-hidden="true" />
          Interactive systems core
        </span>
        <span className="font-mono text-xs text-text-muted">3D / LIVE</span>
      </div>

      <div className="core-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="core-canvas"
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onKeyDown={handleKeyDown}
          aria-label="Interactive 3D network. Drag to rotate, use arrow keys to turn, plus and minus to zoom, and Space to pause or resume."
        >
          An interactive three-dimensional network representing Abhinav's projects.
        </canvas>
        <div className="core-coordinate core-coordinate--top" aria-hidden="true">Y +1.0</div>
        <div className="core-coordinate core-coordinate--bottom" aria-hidden="true">X / Z</div>
      </div>

      <div className="core-panel__readout" aria-live="polite">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: details.color }}>
          {details.label}
        </span>
        <strong>{details.title}</strong>
        <span>{details.caption}</span>
      </div>

      <div className="core-panel__controls">
        <div className="core-mode-switch" role="group" aria-label="Visualization model">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={mode === item.id ? 'is-active' : ''}
              aria-pressed={mode === item.id}
              onClick={() => selectMode(item.id)}
            >
              {item.shortLabel}
            </button>
          ))}
        </div>
        <div className="core-icon-actions" role="group" aria-label="3D view controls">
          <button type="button" onClick={() => adjustZoom(-0.08)} aria-label="Zoom out">
            <Minus size={15} />
          </button>
          <button type="button" onClick={() => adjustZoom(0.08)} aria-label="Zoom in">
            <Plus size={15} />
          </button>
          <button type="button" onClick={togglePlaying} aria-label={isPlaying ? 'Pause rotation' : 'Resume rotation'}>
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button type="button" onClick={resetView} aria-label="Reset 3D view">
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      <p className="core-panel__hint">
        <Orbit size={13} aria-hidden="true" />
        Drag to rotate · Use arrow keys when focused
      </p>
    </div>
  );
}
