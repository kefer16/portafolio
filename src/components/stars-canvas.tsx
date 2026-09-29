"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";
import CanvasErrorBoundary from "./canvas-error-boundary";

function generateSpherePositions(count: number, radius: number) {
   // maath's default RNG can occasionally divide by a zero-length vector and
   // produce NaN positions (see https://github.com/pmndrs/maath/issues/9),
   // which breaks THREE's bounding-sphere calculation. Math.random() avoids it.
   const positions = random.inSphere(
      new Float32Array(count * 3),
      { radius },
      { value: Math.random }
   );
   for (let i = 0; i < positions.length; i++) {
      if (Number.isNaN(positions[i])) positions[i] = 0;
   }
   return positions as Float32Array;
}

// Most stars are white, with a minority tinted like real star color
// temperatures: cool blue-white and warm amber. PointMaterial is a plain
// THREE.PointsMaterial under the hood, which reads a per-vertex "color"
// attribute when vertexColors is set - so this is real per-star color, not
// a texture trick.
function generateStarColors(count: number) {
   const colors = new Float32Array(count * 3);
   for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const roll = Math.random();
      if (roll < 0.08) {
         colors[i3] = 0.75; colors[i3 + 1] = 0.85; colors[i3 + 2] = 1; // blue-white
      } else if (roll < 0.16) {
         colors[i3] = 1; colors[i3 + 1] = 0.82; colors[i3 + 2] = 0.6; // amber
      } else {
         colors[i3] = 1; colors[i3 + 1] = 1; colors[i3 + 2] = 1; // white
      }
   }
   return colors;
}

interface StarLayerProps {
   count: number;
   radius: number;
   size: number;
   opacity: number;
   speed: [number, number];
}

// A single field of points rotating at its own speed. Stacking a few of
// these at different radii/speeds/sizes is what reads as depth (parallax) -
// the near layer sweeps past faster than the far one, same as looking out
// at stars from a moving ship.
//
// PointMaterial only takes one uniform size per draw call (no per-vertex
// size attribute), so "varied star sizes" within a layer is done by
// rendering a second, smaller batch of larger "bright" stars on top of the
// regular ones rather than a single continuous size range.
function StarLayer({ count, radius, size, opacity, speed }: StarLayerProps) {
   const groupRef = useRef<THREE.Group>(null);
   const brightPointsRef = useRef<THREE.Points>(null);

   const positions = useMemo(() => generateSpherePositions(count, radius), [count, radius]);
   const colors = useMemo(() => generateStarColors(count), [count]);

   const brightCount = Math.round(count * 0.05);
   const brightPositions = useMemo(() => generateSpherePositions(brightCount, radius), [brightCount, radius]);
   const brightBaseColors = useMemo(() => generateStarColors(brightCount), [brightCount]);
   // Mutated in place every frame in the useFrame below, starts as a plain
   // copy of the base colors.
   const brightColors = useMemo(() => brightBaseColors.slice(), [brightBaseColors]);
   // Random phase/speed per star so the "bright" stars twinkle independently
   // instead of pulsing in sync.
   const twinkle = useMemo(() => {
      const phases = new Float32Array(brightCount);
      const speeds = new Float32Array(brightCount);
      for (let i = 0; i < brightCount; i++) {
         phases[i] = Math.random() * Math.PI * 2;
         speeds[i] = 0.8 + Math.random() * 1.6;
      }
      return { phases, speeds };
   }, [brightCount]);

   useFrame((state, delta) => {
      if (groupRef.current) {
         groupRef.current.rotation.x -= delta * speed[0];
         groupRef.current.rotation.y -= delta * speed[1];
      }

      // Twinkle: only the smaller "bright" batch gets its color attribute
      // rewritten every frame - animating all ~6800 base stars the same way
      // would be unnecessary GPU upload cost for an effect that's only
      // noticeable on the brighter points anyway.
      const points = brightPointsRef.current;
      if (points) {
         const t = state.clock.elapsedTime;
         for (let i = 0; i < brightCount; i++) {
            const brightness = 0.6 + 0.4 * Math.sin(t * twinkle.speeds[i] + twinkle.phases[i]);
            const i3 = i * 3;
            brightColors[i3] = brightBaseColors[i3] * brightness;
            brightColors[i3 + 1] = brightBaseColors[i3 + 1] * brightness;
            brightColors[i3 + 2] = brightBaseColors[i3 + 2] * brightness;
         }
         const colorAttr = points.geometry.attributes.color as THREE.BufferAttribute | undefined;
         if (colorAttr) colorAttr.needsUpdate = true;
      }
   });

   return (
      <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
         <Points positions={positions} colors={colors} stride={3} frustumCulled={false}>
            <PointMaterial
               transparent
               vertexColors
               size={size}
               sizeAttenuation
               depthWrite={false}
               opacity={opacity}
            />
         </Points>
         <Points ref={brightPointsRef} positions={brightPositions} colors={brightColors} stride={3} frustumCulled={false}>
            <PointMaterial
               transparent
               vertexColors
               size={size * 1.6}
               sizeAttenuation
               depthWrite={false}
               opacity={Math.min(1, opacity + 0.15)}
            />
         </Points>
      </group>
   );
}

function createGlowTexture(rgb: string) {
   const canvas = document.createElement("canvas");
   canvas.width = 256;
   canvas.height = 256;
   const ctx = canvas.getContext("2d");
   if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, `rgba(${rgb}, 0.8)`);
      gradient.addColorStop(0.4, `rgba(${rgb}, 0.35)`);
      gradient.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
   }
   return new THREE.CanvasTexture(canvas);
}

// A shaded sphere clipped to a circle (not a soft fuzzy blob like the glow
// texture above) - a radial gradient offset toward one corner fakes a lit
// side/shadow side, and a few low-alpha bands give it a gas-giant read.
function createPlanetTexture(highlight: string, base: string, shadow: string) {
   const canvas = document.createElement("canvas");
   canvas.width = 256;
   canvas.height = 256;
   const ctx = canvas.getContext("2d");
   if (ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(128, 128, 118, 0, Math.PI * 2);
      ctx.clip();

      const gradient = ctx.createRadialGradient(92, 88, 8, 128, 128, 150);
      gradient.addColorStop(0, highlight);
      gradient.addColorStop(0.5, base);
      gradient.addColorStop(1, shadow);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);

      ctx.globalAlpha = 0.14;
      ctx.fillStyle = shadow;
      [40, 95, 150, 195].forEach((y, i) => {
         ctx.fillRect(0, y, 256, 10 + (i % 2) * 6);
      });

      ctx.restore();
   }
   return new THREE.CanvasTexture(canvas);
}

interface FocalPlanetProps {
   position: [number, number, number];
   scale: number;
}

// The space theme's single strong anchor, replacing what used to be three
// scattered nebula clouds - one glowing planet the eye can land on, the
// same role the village's lit windows and the pumpkin glow play for the
// other two themes. Static (no rotation or pulse): it reads as a fixed
// point in the sky rather than something competing with the twinkling
// stars for attention.
function FocalPlanet({ position, scale }: FocalPlanetProps) {
   const haloTexture = useMemo(() => createGlowTexture("129, 140, 248"), []);
   const bodyTexture = useMemo(() => createPlanetTexture("#e8ebff", "#6d7cc7", "#20254a"), []);

   return (
      <group position={position}>
         <sprite scale={[scale * 2.6, scale * 2.6, 1]}>
            <spriteMaterial map={haloTexture} transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
         </sprite>
         <sprite scale={[scale, scale, 1]}>
            <spriteMaterial map={bodyTexture} transparent depthWrite={false} />
         </sprite>
      </group>
   );
}

function createStreakTexture() {
   const canvas = document.createElement("canvas");
   canvas.width = 256;
   canvas.height = 16;
   const ctx = canvas.getContext("2d");
   if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 256, 0);
      gradient.addColorStop(0, "rgba(255,255,255,0)");
      gradient.addColorStop(0.82, "rgba(255,255,255,0.85)");
      gradient.addColorStop(1, "rgba(255,255,255,1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 16);
   }
   return new THREE.CanvasTexture(canvas);
}

interface ShootingStarProps {
   minDelay: number;
   maxDelay: number;
}

// A comet-like streak (a stretched, additive sprite with a gradient texture
// - bright head, fading tail) that crosses the screen every so often. It
// isn't React state driven: position/opacity/rotation are written straight
// onto the sprite's THREE objects every frame, the same "mutate + let R3F
// re-render the canvas" approach as the star twinkle above.
function ShootingStar({ minDelay, maxDelay }: ShootingStarProps) {
   const spriteRef = useRef<THREE.Sprite>(null);
   const texture = useMemo(() => createStreakTexture(), []);
   const flight = useRef({
      start: new THREE.Vector3(),
      dir: new THREE.Vector3(1, -1, 0),
      angle: 0,
      duration: 1,
      startedAt: -Infinity,
      nextAt: minDelay + Math.random() * (maxDelay - minDelay),
   });

   useFrame((r3f) => {
      const sprite = spriteRef.current;
      if (!sprite) return;
      const material = sprite.material as THREE.SpriteMaterial;
      const t = r3f.clock.elapsedTime;
      const f = flight.current;
      const elapsed = t - f.startedAt;

      if (t >= f.nextAt && elapsed > f.duration) {
         const angleDeg = -55 + Math.random() * 30; // upper-left to lower-right
         const angle = (angleDeg * Math.PI) / 180;
         f.start.set(-1.3 + Math.random() * 0.5, 0.7 + Math.random() * 0.35, -0.4 - Math.random() * 0.6);
         f.dir.set(Math.cos(angle), Math.sin(angle), 0);
         f.angle = angle;
         f.duration = 0.7 + Math.random() * 0.5;
         f.startedAt = t;
         f.nextAt = t + f.duration + minDelay + Math.random() * (maxDelay - minDelay);
      }

      const progress = elapsed / f.duration;
      if (progress >= 0 && progress <= 1) {
         const distance = 2.4;
         sprite.position.set(
            f.start.x + f.dir.x * distance * progress,
            f.start.y + f.dir.y * distance * progress,
            f.start.z
         );
         let opacity = 1;
         if (progress < 0.15) opacity = progress / 0.15;
         else if (progress > 0.6) opacity = 1 - (progress - 0.6) / 0.4;
         material.opacity = Math.max(0, opacity);
         material.rotation = f.angle;
         sprite.visible = true;
      } else {
         sprite.visible = false;
      }
   });

   return (
      <sprite ref={spriteRef} scale={[0.55, 0.02, 1]} visible={false}>
         <spriteMaterial
            map={texture}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
         />
      </sprite>
   );
}

const StarBackground = () => (
   <>
      <FocalPlanet position={[1.35, 0.9, -2.6]} scale={0.65} />
      <StarLayer count={600} radius={1.7} size={0.0025} opacity={0.45} speed={[0.03, 0.02]} />
      <StarLayer count={900} radius={1.2} size={0.0035} opacity={0.65} speed={[0.1, 0.067]} />
      <StarLayer count={400} radius={0.8} size={0.0045} opacity={0.75} speed={[0.17, 0.11]} />
      <ShootingStar minDelay={9} maxDelay={20} />
      <ShootingStar minDelay={14} maxDelay={24} />
   </>
);

const StarsCanvas = () => (
   <div
      aria-hidden="true"
      className="w-full h-auto fixed inset-0 z-10 pointer-events-none bg-transparent flex"
   >
      <CanvasErrorBoundary>
         <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
               <StarBackground />
            </Suspense>
         </Canvas>
      </CanvasErrorBoundary>
   </div>
);

export default StarsCanvas;
