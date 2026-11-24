"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NeuronSphere({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    const pulse = 0.6 + Math.sin(t * 1.5) * 0.4;

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = pulse * 0.8;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.3);
      const gmat = glowRef.current.material as THREE.MeshBasicMaterial;
      gmat.opacity = pulse * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.15} />
      </mesh>
      {/* Core neuron */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function NeuralConnection({ start, end, delay }: { start: THREE.Vector3; end: THREE.Vector3; delay: number }) {
  const lineRef = useRef<THREE.Line>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
    const mat = new THREE.LineBasicMaterial({ color: "#00f0ff", transparent: true, opacity: 0.15 });
    return new THREE.Line(geo, mat);
  }, [start, end]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    if (lineRef.current) {
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = 0.12 + Math.sin(t * 0.8) * 0.08;
    }
    if (pulseRef.current) {
      const progress = ((t * 0.3) % 1);
      pulseRef.current.position.lerpVectors(start, end, progress);
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.6 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group>
      <primitive ref={lineRef} object={lineObj} />
      {/* Traveling pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshBasicMaterial color="#7b2eff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function BrainStructure() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate neuron positions on a sphere surface
  const neurons = useMemo(() => {
    const pts: { pos: [number, number, number]; delay: number }[] = [];
    const count = 50;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 0.8 + Math.random() * 0.3;
      pts.push({
        pos: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        ],
        delay: Math.random() * 10
      });
    }
    return pts;
  }, []);

  // Generate connections between nearby neurons
  const connections = useMemo(() => {
    const conns: { start: THREE.Vector3; end: THREE.Vector3; delay: number }[] = [];
    for (let i = 0; i < neurons.length; i++) {
      for (let j = i + 1; j < neurons.length; j++) {
        const a = new THREE.Vector3(...neurons[i].pos);
        const b = new THREE.Vector3(...neurons[j].pos);
        if (a.distanceTo(b) < 0.8 && conns.length < 60) {
          conns.push({ start: a, end: b, delay: Math.random() * 10 });
        }
      }
    }
    return conns;
  }, [neurons]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Semi-transparent brain shell */}
      <mesh>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.03}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial
          color="#7b2eff"
          transparent
          opacity={0.02}
          wireframe
        />
      </mesh>

      {/* Neurons */}
      {neurons.map((n, i) => (
        <NeuronSphere key={`neuron-${i}`} position={n.pos} delay={n.delay} />
      ))}

      {/* Neural connections */}
      {connections.map((c, i) => (
        <NeuralConnection key={`conn-${i}`} start={c.start} end={c.end} delay={c.delay} />
      ))}

      {/* Inner core glow */}
      <mesh>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export function BrainModel() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] opacity-60">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <BrainStructure />
      </Canvas>
    </div>
  );
}
