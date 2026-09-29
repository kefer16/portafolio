"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import CanvasErrorBoundary from "./canvas-error-boundary";

function seededRandom(seed: number) {
   const x = Math.sin(seed) * 10000;
   return x - Math.floor(x);
}

function createGlowTexture(rgb: string) {
   const canvas = document.createElement("canvas");
   canvas.width = 256;
   canvas.height = 256;
   const ctx = canvas.getContext("2d");
   if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, `rgba(${rgb}, 0.7)`);
      gradient.addColorStop(0.45, `rgba(${rgb}, 0.3)`);
      gradient.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
   }
   return new THREE.CanvasTexture(canvas);
}

// A minimal bat silhouette (two notched wings meeting a small body bump),
// drawn once to a canvas and reused as a sprite texture - no external art.
function createBatTexture() {
   const canvas = document.createElement("canvas");
   canvas.width = 128;
   canvas.height = 80;
   const ctx = canvas.getContext("2d");
   if (ctx) {
      ctx.fillStyle = "#140d1f";
      ctx.beginPath();
      ctx.moveTo(0, 40);
      ctx.bezierCurveTo(20, 10, 40, 30, 52, 40);
      ctx.bezierCurveTo(56, 24, 60, 24, 64, 40);
      ctx.bezierCurveTo(68, 24, 72, 24, 76, 40);
      ctx.bezierCurveTo(88, 30, 108, 10, 128, 40);
      ctx.bezierCurveTo(100, 44, 80, 56, 64, 48);
      ctx.bezierCurveTo(48, 56, 28, 44, 0, 40);
      ctx.closePath();
      ctx.fill();
   }
   return new THREE.CanvasTexture(canvas);
}

// A small rounded ghost with a wavy hem and two eyes, for the occasional
// drift-across effect.
function createGhostTexture() {
   const canvas = document.createElement("canvas");
   canvas.width = 100;
   canvas.height = 120;
   const ctx = canvas.getContext("2d");
   if (ctx) {
      ctx.fillStyle = "rgba(232, 228, 245, 0.9)";
      ctx.beginPath();
      ctx.moveTo(10, 100);
      ctx.arc(50, 55, 40, Math.PI, 0);
      ctx.lineTo(90, 100);
      ctx.bezierCurveTo(80, 85, 70, 115, 60, 100);
      ctx.bezierCurveTo(50, 85, 40, 115, 30, 100);
      ctx.bezierCurveTo(20, 115, 15, 90, 10, 100);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(35, 28, 55, 0.65)";
      ctx.beginPath();
      ctx.ellipse(38, 58, 5, 7, 0, 0, Math.PI * 2);
      ctx.ellipse(62, 58, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();
   }
   return new THREE.CanvasTexture(canvas);
}

interface FogBankProps {
   position: [number, number, number];
   scale: number;
   opacity: number;
   driftSpeed: number;
}

// Slow-drifting soft gray-lavender haze standing in for ground fog.
function FogBank({ position, scale, opacity, driftSpeed }: FogBankProps) {
   const ref = useRef<THREE.Sprite>(null);
   const texture = useMemo(() => createGlowTexture("175, 165, 195"), []);

   useFrame((state) => {
      if (!ref.current) return;
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * driftSpeed) * 3;
   });

   return (
      <sprite ref={ref} position={position} scale={[scale, scale * 0.55, 1]}>
         <spriteMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
      </sprite>
   );
}

interface PumpkinGlowProps {
   position: [number, number, number];
   scale: number;
   opacity: number;
   seed: number;
}

// Jack-o'-lantern glow: same soft sprite as the fog, but colored orange and
// with its opacity driven by a couple of mismatched sine waves each frame
// for an irregular, candle-like flicker instead of a smooth twinkle.
function PumpkinGlow({ position, scale, opacity, seed }: PumpkinGlowProps) {
   const materialRef = useRef<THREE.SpriteMaterial>(null);
   const texture = useMemo(() => createGlowTexture("255, 120, 20"), []);

   useFrame((state) => {
      if (!materialRef.current) return;
      const t = state.clock.elapsedTime;
      const flicker = 0.55 + 0.3 * Math.sin(t * 9 + seed) + 0.15 * Math.sin(t * 21 + seed * 2.3);
      materialRef.current.opacity = opacity * Math.max(0.45, Math.min(1, flicker));
   });

   return (
      <sprite position={position} scale={[scale, scale, 1]}>
         <spriteMaterial ref={materialRef} map={texture} transparent opacity={opacity} depthWrite={false} />
      </sprite>
   );
}

interface BatProps {
   seed: number;
   base: [number, number, number];
   scale: number;
   opacity: number;
}

// A bat hovering around a fixed spot with a small figure-eight-ish wobble,
// each on its own phase/speed so a group of them don't move in unison.
function Bat({ seed, base, scale, opacity }: BatProps) {
   const ref = useRef<THREE.Sprite>(null);
   const texture = useMemo(() => createBatTexture(), []);
   const ampX = 1.4 + seededRandom(seed) * 1.4;
   const ampY = 0.5 + seededRandom(seed + 1) * 0.6;
   const speed = 0.5 + seededRandom(seed + 2) * 0.5;
   const phase = seededRandom(seed + 3) * Math.PI * 2;

   useFrame((state) => {
      if (!ref.current) return;
      const t = state.clock.elapsedTime * speed + phase;
      ref.current.position.x = base[0] + Math.sin(t) * ampX;
      ref.current.position.y = base[1] + Math.sin(t * 2.1) * ampY;
      const flap = 0.85 + Math.abs(Math.sin(t * 6)) * 0.15;
      ref.current.scale.set(scale, scale * 0.62 * flap, 1);
   });

   return (
      <sprite ref={ref} position={base} scale={[scale, scale * 0.62, 1]}>
         <spriteMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
      </sprite>
   );
}

interface GhostDriftProps {
   minDelay: number;
   maxDelay: number;
}

// The occasional "something crosses the screen" moment, the halloween
// counterpart to the space theme's shooting star: a ghost drifting slowly
// across at a random height, fading in and out. Same spawn-timer pattern as
// the shooting star (mutating the sprite directly every frame rather than
// through React state).
function GhostDrift({ minDelay, maxDelay }: GhostDriftProps) {
   const ref = useRef<THREE.Sprite>(null);
   const texture = useMemo(() => createGhostTexture(), []);
   const flight = useRef({
      startX: 0,
      y: 0,
      z: 0,
      dir: 1,
      duration: 6,
      startedAt: -Infinity,
      nextAt: minDelay + Math.random() * (maxDelay - minDelay),
   });

   useFrame((state) => {
      const sprite = ref.current;
      if (!sprite) return;
      const material = sprite.material as THREE.SpriteMaterial;
      const t = state.clock.elapsedTime;
      const f = flight.current;
      const elapsed = t - f.startedAt;

      if (t >= f.nextAt && elapsed > f.duration) {
         f.dir = Math.random() > 0.5 ? 1 : -1;
         f.startX = f.dir === 1 ? -14 : 14;
         f.y = 2 + Math.random() * 4;
         f.z = -6 - Math.random() * 6;
         f.duration = 7 + Math.random() * 4;
         f.startedAt = t;
         f.nextAt = t + f.duration + minDelay + Math.random() * (maxDelay - minDelay);
      }

      const progress = elapsed / f.duration;
      if (progress >= 0 && progress <= 1) {
         const distance = 28;
         sprite.position.set(
            f.startX + f.dir * distance * progress,
            f.y + Math.sin(progress * Math.PI * 3) * 0.6,
            f.z
         );
         let opacity = 1;
         if (progress < 0.15) opacity = progress / 0.15;
         else if (progress > 0.75) opacity = 1 - (progress - 0.75) / 0.25;
         material.opacity = Math.max(0, opacity) * 0.85;
         sprite.visible = true;
      } else {
         sprite.visible = false;
      }
   });

   return (
      <sprite ref={ref} scale={[2.6, 3.1, 1]} visible={false}>
         <spriteMaterial map={texture} transparent opacity={0} depthWrite={false} />
      </sprite>
   );
}

const HalloweenBackground = () => (
   <>
      <FogBank position={[-8, -4, -14]} scale={16} opacity={0.3} driftSpeed={0.05} />
      <FogBank position={[7, -6, -18]} scale={20} opacity={0.26} driftSpeed={0.04} />
      <FogBank position={[0, 2, -10]} scale={13} opacity={0.2} driftSpeed={0.06} />

      <PumpkinGlow position={[6, -2, -8]} scale={7} opacity={0.5} seed={1} />
      <PumpkinGlow position={[-7, -3, -11]} scale={6} opacity={0.45} seed={7} />

      <Bat seed={1} base={[-6, 3, -5]} scale={1.6} opacity={0.85} />
      <Bat seed={2} base={[4, 5, -7]} scale={1.3} opacity={0.7} />
      <Bat seed={3} base={[-3, 1, -3]} scale={1.9} opacity={0.9} />
      <Bat seed={4} base={[7, 2, -9]} scale={1.1} opacity={0.6} />
      <Bat seed={5} base={[1, 6, -6]} scale={1.4} opacity={0.75} />
      <Bat seed={6} base={[-8, -1, -8]} scale={1.2} opacity={0.65} />

      <GhostDrift minDelay={9} maxDelay={20} />
   </>
);

const HalloweenCanvas = () => (
   <div
      aria-hidden="true"
      className="w-full h-auto fixed inset-0 z-10 pointer-events-none bg-transparent flex"
   >
      <CanvasErrorBoundary>
         <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <HalloweenBackground />
         </Canvas>
      </CanvasErrorBoundary>
   </div>
);

export default HalloweenCanvas;
