import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export type CoreMode = 'agent' | 'graph' | 'commerce';

const MODE_COLORS: Record<CoreMode, { primary: string; secondary: string }> = {
  agent: { primary: '#c8fa55', secondary: '#a78bfa' },
  graph: { primary: '#58d7e5', secondary: '#c8fa55' },
  commerce: { primary: '#a78bfa', secondary: '#c8fa55' },
};

function shellGeometry(count: number, radius: number, jitter = true) {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const scale = radius * (jitter ? 0.92 + Math.random() * 0.16 : 1);
    positions[i * 3] = Math.cos(theta) * r * scale;
    positions[i * 3 + 1] = y * scale;
    positions[i * 3 + 2] = Math.sin(theta) * r * scale;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

function ParticleShell({ color, count = 700, radius = 2.35 }: { color: string; count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => shellGeometry(count, radius), [count, radius]);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
    }
  });
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.035} color={color} transparent opacity={0.75} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Orbiters({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.35;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });
  return (
    <group ref={ref}>
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 2.1, Math.sin(angle * 2) * 0.35, Math.sin(angle) * 2.1]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} />
          </mesh>
        );
      })}
    </group>
  );
}

function NeuralCore({ mode, playing, zoom, spin }: { mode: CoreMode; playing: boolean; zoom: number; spin: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const { primary, secondary } = MODE_COLORS[mode];

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const targetY = spin.y + state.pointer.x * 0.35 + (playing ? t * 0.12 : 0);
    const targetX = spin.x - state.pointer.y * 0.25;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3.5, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3.5, delta);
    const s = THREE.MathUtils.damp(group.current.scale.x, zoom * (1 + Math.sin(t * 1.4) * 0.015), 6, delta);
    group.current.scale.setScalar(s);
    group.current.position.y = Math.sin(t * 0.9) * 0.08;
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.25;
      inner.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={inner}>
        {mode === 'agent' && <icosahedronGeometry args={[1.08, 1]} />}
        {mode === 'graph' && <dodecahedronGeometry args={[1.15, 0]} />}
        {mode === 'commerce' && <torusKnotGeometry args={[0.82, 0.26, 180, 24]} />}
        <meshStandardMaterial
          color={primary}
          emissive={primary}
          emissiveIntensity={0.14}
          roughness={0.35}
          metalness={0.45}
          transparent
          opacity={0.82}
          flatShading
        />
      </mesh>
      {/* Facet wireframe on the core itself for a network feel */}
      <mesh scale={1.005}>
        {mode === 'agent' && <icosahedronGeometry args={[1.08, 1]} />}
        {mode === 'graph' && <dodecahedronGeometry args={[1.15, 0]} />}
        {mode === 'commerce' && <torusKnotGeometry args={[0.82, 0.26, 120, 16]} />}
        <meshBasicMaterial color="#0b0e08" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh scale={1.18} rotation={[0.4, 0.6, 0]}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={secondary} wireframe transparent opacity={0.32} />
      </mesh>
      <mesh scale={1.45} rotation={[-0.3, -0.4, 0.2]}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color={primary} wireframe transparent opacity={0.14} />
      </mesh>

      <mesh rotation={[Math.PI / 2.4, 0, 0.3]}>
        <torusGeometry args={[1.95, 0.008, 8, 128]} />
        <meshBasicMaterial color={primary} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.4, -0.2]}>
        <torusGeometry args={[2.15, 0.006, 8, 128]} />
        <meshBasicMaterial color={secondary} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 3, -0.5, 0.5]}>
        <torusGeometry args={[1.75, 0.005, 8, 128]} />
        <meshBasicMaterial color={primary} transparent opacity={0.22} />
      </mesh>

      <ParticleShell color={primary} />
      <Orbiters color={secondary} />
    </group>
  );
}

export function Hero3D({
  mode,
  playing,
  zoom,
  spin,
  resetKey,
}: {
  mode: CoreMode;
  playing: boolean;
  zoom: number;
  spin: { x: number; y: number };
  resetKey: number;
}) {
  const { primary, secondary } = MODE_COLORS[mode];
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', cursor: 'grab', touchAction: 'pan-y' }}
      aria-label="Interactive 3D neural core. Drag to orbit."
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 4, 4]} intensity={30} color={primary} />
        <pointLight position={[-4, -3, -2]} intensity={18} color={secondary} />
        <NeuralCore key={resetKey} mode={mode} playing={playing} zoom={zoom} spin={spin} />
        <OrbitControls
          key={`controls-${resetKey}`}
          enablePan={false}
          enableZoom={false}
          enableRotate
          rotateSpeed={0.6}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={0.35}
          maxPolarAngle={Math.PI - 0.35}
        />
      </Suspense>
    </Canvas>
  );
}

function AmbientPoints() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color('#c8fa55'), new THREE.Color('#58d7e5'), new THREE.Color('#a78bfa'), new THREE.Color('#ffffff')];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.012;
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, state.pointer.x * 0.5, 2, delta);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, state.pointer.y * 0.3, 2, delta);
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.55} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export function AmbientField() {
  return (
    <div className="ambient-webgl" aria-hidden="true">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <AmbientPoints />
        </Suspense>
      </Canvas>
    </div>
  );
}
