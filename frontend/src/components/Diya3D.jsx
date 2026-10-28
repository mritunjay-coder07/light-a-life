import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Higher = faster. ~1.1 gives a smooth fade of roughly 3.5 seconds.
const LIGHT_DAMPING = 1.1;

function createFlameShape() {
  const shape = new THREE.Shape();

  shape.moveTo(0, 0);
  shape.bezierCurveTo(-0.15, 0.14, -0.24, 0.32, -0.15, 0.49);
  shape.bezierCurveTo(-0.11, 0.57, -0.04, 0.67, 0.02, 0.78);
  shape.bezierCurveTo(0.04, 0.63, 0.21, 0.52, 0.2, 0.35);
  shape.bezierCurveTo(0.2, 0.21, 0.11, 0.09, 0, 0);

  return shape;
}

function Flame({ isLit }) {
  const groupRef = useRef();
  const flameRef = useRef();
  const innerFlameRef = useRef();
  const lightRef = useRef();

  const outerMatRef = useRef();
  const innerMatRef = useRef();
  const coreMatRef = useRef();
  const haloMatRef = useRef();

  // Smoothly animated 0 -> 1 "how lit is it" value
  const litRef = useRef(0);

  const flameGeometry = useMemo(
    () => new THREE.ShapeGeometry(createFlameShape(), 24),
    []
  );

  const innerGeometry = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.bezierCurveTo(-0.075, 0.12, -0.09, 0.23, -0.025, 0.39);
    shape.bezierCurveTo(0.015, 0.31, 0.105, 0.23, 0.075, 0.13);
    shape.bezierCurveTo(0.06, 0.07, 0.025, 0.025, 0, 0);

    return new THREE.ShapeGeometry(shape, 20);
  }, []);

  // Soft radial glow texture for the flame halo
  const haloTexture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );

    gradient.addColorStop(0, "rgba(255, 196, 96, 0.85)");
    gradient.addColorStop(0.35, "rgba(255, 140, 40, 0.35)");
    gradient.addColorStop(1, "rgba(255, 100, 10, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // Smooth ignition / extinguish
    litRef.current = THREE.MathUtils.damp(
      litRef.current,
      isLit ? 1 : 0,
      LIGHT_DAMPING,
      delta
    );
    const lit = litRef.current;

    // Flame grows up from the wick as it lights
    if (groupRef.current) {
      groupRef.current.scale.setScalar(0.4 + 0.6 * lit);
    }

    // Fade flame layers in/out
    if (outerMatRef.current) outerMatRef.current.opacity = lit;
    if (innerMatRef.current) innerMatRef.current.opacity = lit;
    if (coreMatRef.current) coreMatRef.current.opacity = lit;
    if (haloMatRef.current) {
      haloMatRef.current.opacity = lit * (0.85 + Math.sin(t * 7) * 0.1);
    }

    // Flicker
    if (flameRef.current) {
      flameRef.current.rotation.z = Math.sin(t * 5) * 0.045;
      flameRef.current.scale.x = 1.05 * (1 + Math.sin(t * 7) * 0.055);
      flameRef.current.scale.y = 1.12 * (1 + Math.sin(t * 6) * 0.035);
    }

    if (innerFlameRef.current) {
      innerFlameRef.current.rotation.z = Math.sin(t * 6 + 1) * 0.035;
      innerFlameRef.current.scale.y = 0.94 * (1 + Math.sin(t * 8) * 0.04);
    }

    if (lightRef.current) {
      lightRef.current.intensity = (3.2 + Math.sin(t * 8) * 0.35) * lit;
    }
  });

  return (
    <group ref={groupRef} position={[0.34, 0.49, 0.08]} scale={0.4}>
      {/* Billboard keeps the flat flame facing the camera, even while the
          diya rotates, so it never turns edge-on and disappears. */}
      <Billboard>
        {/* Soft glow halo behind the flame */}
        <mesh position={[0, 0.3, -0.03]} scale={[1.3, 1.3, 1]} renderOrder={1}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            ref={haloMatRef}
            map={haloTexture}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        {/* Outer orange flame */}
        <mesh
          ref={flameRef}
          geometry={flameGeometry}
          position={[0, 0, 0]}
          scale={[1.05, 1.12, 1]}
          renderOrder={2}
        >
          <meshBasicMaterial
            ref={outerMatRef}
            color="#ff7512"
            side={THREE.DoubleSide}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Golden inner flame */}
        <mesh
          ref={innerFlameRef}
          geometry={innerGeometry}
          position={[0, 0.045, 0.012]}
          scale={[0.9, 0.94, 1]}
          renderOrder={3}
        >
          <meshBasicMaterial
            ref={innerMatRef}
            color="#ffd45b"
            side={THREE.DoubleSide}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Small bright center */}
        <mesh
          position={[0.005, 0.105, 0.02]}
          scale={[0.045, 0.13, 0.025]}
          renderOrder={4}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            ref={coreMatRef}
            color="#fff0a3"
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </Billboard>

      <pointLight
        ref={lightRef}
        color="#ff9b35"
        intensity={0}
        distance={4.5}
        decay={2}
        position={[0, 0.3, 0.35]}
      />
    </group>
  );
}

function GoldBead({ position, radius = 0.035 }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial
        color="#ffce72"
        metalness={0.85}
        roughness={0.23}
        emissive="#8b3d08"
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

function LotusPetal({ position, rotation = [0, 0, 0], scale = 1 }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow>
      <sphereGeometry args={[1, 24, 20]} />
      <meshStandardMaterial
        color="#b96925"
        metalness={0.82}
        roughness={0.3}
        emissive="#4e1c05"
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

function OrnateDiya({ isLit, onDiyaClick }) {
  const groupRef = useRef();
  const oilMatRef = useRef();

  const bowlProfile = useMemo(
    () => [
      new THREE.Vector2(0.12, 0.12),
      new THREE.Vector2(0.32, 0.12),
      new THREE.Vector2(0.55, 0.17),
      new THREE.Vector2(0.76, 0.25),
      new THREE.Vector2(0.92, 0.34),
      new THREE.Vector2(1.02, 0.41),
      new THREE.Vector2(1.035, 0.44),
      new THREE.Vector2(0.96, 0.46),
      new THREE.Vector2(0.82, 0.39),
      new THREE.Vector2(0.63, 0.31),
      new THREE.Vector2(0.4, 0.27),
      new THREE.Vector2(0.12, 0.27),
    ],
    []
  );

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.position.y = -0.25 + Math.sin(t * 0.75) * 0.018;
    }

    // Oil surface glow fades in/out smoothly with the flame
    if (oilMatRef.current) {
      oilMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        oilMatRef.current.emissiveIntensity,
        isLit ? 0.55 : 0.04,
        LIGHT_DAMPING,
        delta
      );
    }
  });

  return (
    <group
      ref={groupRef}
      scale={0.65}
      onClick={(event) => {
        event.stopPropagation();
        onDiyaClick?.();
      }}
    >
      {/* Pedestal base */}
      <mesh position={[0, -0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.58, 0.67, 0.14, 64]} />
        <meshStandardMaterial
          color="#7c3d16"
          metalness={0.82}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[0, 0.045, 0]} castShadow>
        <cylinderGeometry args={[0.47, 0.55, 0.07, 64]} />
        <meshStandardMaterial
          color="#d18a3a"
          metalness={0.88}
          roughness={0.24}
        />
      </mesh>

      <mesh position={[0, 0.095, 0]} castShadow>
        <cylinderGeometry args={[0.31, 0.42, 0.06, 64]} />
        <meshStandardMaterial
          color="#8c491d"
          metalness={0.8}
          roughness={0.28}
        />
      </mesh>

      {/* Sculpted bowl */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <latheGeometry args={[bowlProfile, 128]} />
        <meshStandardMaterial
          color="#a95e26"
          metalness={0.88}
          roughness={0.27}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bowl inner oil surface */}
      <mesh position={[0, 0.365, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.78, 96]} />
        <meshStandardMaterial
          ref={oilMatRef}
          color="#6c300c"
          metalness={0.45}
          roughness={0.3}
          emissive="#b45a12"
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* Single raised rim */}
      <mesh
        position={[0, 0.405, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <torusGeometry args={[1.005, 0.026, 12, 128]} />
        <meshStandardMaterial
          color="#f0b45a"
          metalness={0.9}
          roughness={0.22}
          emissive="#71300a"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Lotus petals around the bowl */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;

        return (
          <LotusPetal
            key={`petal-${i}`}
            position={[
              Math.cos(angle) * 0.86,
              0.34,
              Math.sin(angle) * 0.86,
            ]}
            rotation={[0.15, -angle, Math.PI / 2]}
            scale={[0.18, 0.075, 0.31]}
          />
        );
      })}

      {/* Decorative gold beads around the rim */}
      {Array.from({ length: 32 }, (_, i) => {
        const angle = (i / 32) * Math.PI * 2;

        return (
          <GoldBead
            key={`rim-bead-${i}`}
            radius={i % 4 === 0 ? 0.034 : 0.022}
            position={[
              Math.cos(angle) * 0.97,
              0.415,
              Math.sin(angle) * 0.97,
            ]}
          />
        );
      })}

      {/* Decorative base beads */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2;

        return (
          <GoldBead
            key={`base-bead-${i}`}
            radius={0.026}
            position={[
              Math.cos(angle) * 0.59,
              -0.035,
              Math.sin(angle) * 0.59,
            ]}
          />
        );
      })}

      {/* Wick */}
      <mesh position={[0.32, 0.405, 0.04]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.018, 0.024, 0.13, 12]} />
        <meshStandardMaterial color="#2c1307" roughness={0.9} />
      </mesh>

      {/* Flame is controlled by LandingPage's isLit state */}
      <Flame isLit={isLit} />
    </group>
  );
}

// Front fill light that fades smoothly with the flame
function FillLight({ isLit }) {
  const lightRef = useRef();

  useFrame((_, delta) => {
    if (!lightRef.current) return;

    lightRef.current.intensity = THREE.MathUtils.damp(
      lightRef.current.intensity,
      isLit ? 1.4 : 0.25,
      LIGHT_DAMPING,
      delta
    );
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 1.3, 2]}
      intensity={0.25}
      color="#ff9c3c"
      distance={6}
    />
  );
}

export default function Diya3D({ isLit = true, onDiyaClick }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.9, 4.7], fov: 36 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <ambientLight intensity={0.8} color="#ffd8a0" />
      <hemisphereLight
        skyColor="#ffe0a8"
        groundColor="#4a1b08"
        intensity={1.05}
      />

      <directionalLight
        position={[3, 5, 4]}
        intensity={2.2}
        color="#ffd18a"
        castShadow
      />

      <pointLight
        position={[-2, 2, -1]}
        intensity={1.1}
        color="#d96922"
        distance={8}
      />

      <FillLight isLit={isLit} />

      <OrnateDiya isLit={isLit} onDiyaClick={onDiyaClick} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3}
        maxDistance={7}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.85}
        rotateSpeed={0.7}
        zoomSpeed={0.7}
      />
    </Canvas>
  );
}