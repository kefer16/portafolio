"use client";

import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import CanvasErrorBoundary from './canvas-error-boundary'

interface SnowBatchProps {
   count: number;
   size: number;
   speedRange: [number, number];
   zRange: [number, number];
   opacity: number;
   drift: number;
}

// One batch of falling flakes. SnowLayer renders two of these (regular +
// "big flake") stacked together, the same two-tier trick used for the
// star field: PointMaterial only takes one uniform size per draw call, so
// varied flake sizes means a second, sparser batch of larger points.
function SnowBatch({ count, size, speedRange, zRange, opacity, drift }: SnowBatchProps) {
   const pointsRef = useRef<THREE.Points>(null);

   const positions = useMemo(() => {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
         const i3 = i * 3;
         positions[i3] = (Math.random() - 0.5) * 50;
         positions[i3 + 1] = Math.random() * 50 - 25;
         positions[i3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0]);
      }
      return positions;
   }, [count, zRange]);

   const speeds = useMemo(() => {
      const arr = new Float32Array(count);
      for (let i = 0; i < count; i++) arr[i] = speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);
      return arr;
   }, [count, speedRange]);

   useFrame((state) => {
      if (!pointsRef.current) return;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
         const i3 = i * 3;
         positions[i3 + 1] -= speeds[i];
         positions[i3] += Math.sin(state.clock.elapsedTime + i) * drift;
         positions[i3 + 2] += Math.cos(state.clock.elapsedTime + i) * drift * 0.5;

         if (positions[i3 + 1] < -25) {
            positions[i3 + 1] = 25;
            positions[i3] = (Math.random() - 0.5) * 50;
         }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
   });

   return (
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
         <PointMaterial
            transparent
            color="#ffffff"
            size={size}
            sizeAttenuation
            depthWrite={false}
            opacity={opacity}
         />
      </Points>
   );
}

interface SnowLayerProps extends SnowBatchProps { }

// A full depth layer: mostly fine flakes plus a sparse batch of bigger
// ones. Stacking 3 of these at different z-ranges/speeds/sizes is what
// reads as depth - near flakes fall faster and look bigger, far ones drift
// slower and stay small, the same parallax idea as the star layers.
function SnowLayer({ count, size, speedRange, zRange, opacity, drift }: SnowLayerProps) {
   const bigCount = Math.round(count * 0.15);

   return (
      <>
         <SnowBatch count={count} size={size} speedRange={speedRange} zRange={zRange} opacity={opacity} drift={drift} />
         <SnowBatch
            count={bigCount}
            size={size * 1.8}
            speedRange={speedRange}
            zRange={zRange}
            opacity={Math.min(1, opacity + 0.1)}
            drift={drift}
         />
      </>
   );
}

// A sleigh-and-reindeer silhouette, drawn once to a canvas and reused as a
// sprite texture - no external art, same trick as the bat/ghost shapes.
// Drawn facing right, reindeer LEADING at the high-x end (pulling) and the
// sleigh trailing behind at the low-x end; SantaFlyby mirrors it via a
// negative x-scale when it flies right-to-left.
function createSantaTexture() {
   const canvas = document.createElement("canvas");
   canvas.width = 340;
   canvas.height = 70;
   const ctx = canvas.getContext("2d");
   if (ctx) {
      ctx.fillStyle = "#1a1330";
      ctx.strokeStyle = "#1a1330";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(20, 50);
      ctx.quadraticCurveTo(30, 30, 55, 32);
      ctx.lineTo(90, 32);
      ctx.quadraticCurveTo(100, 32, 98, 44);
      ctx.lineTo(30, 50);
      ctx.quadraticCurveTo(20, 52, 12, 48);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(62, 24, 10, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(64, 10, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(58, 6);
      ctx.lineTo(72, 4);
      ctx.lineTo(70, -4);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(98, 44);
      ctx.lineTo(140, 40);
      ctx.stroke();

      [150, 185, 220].forEach((dx) => {
         ctx.beginPath();
         ctx.ellipse(dx, 42, 12, 6, 0, 0, Math.PI * 2);
         ctx.fill();
         ctx.beginPath();
         ctx.moveTo(dx + 10, 40);
         ctx.lineTo(dx + 20, 30);
         ctx.lineTo(dx + 24, 32);
         ctx.moveTo(dx + 20, 30);
         ctx.lineTo(dx + 17, 21);
         ctx.moveTo(dx + 20, 30);
         ctx.lineTo(dx + 23, 20);
         ctx.moveTo(dx - 6, 47);
         ctx.lineTo(dx - 7, 58);
         ctx.moveTo(dx + 6, 47);
         ctx.lineTo(dx + 7, 58);
         ctx.stroke();
      });
   }
   return new THREE.CanvasTexture(canvas);
}

interface SantaFlybyProps {
   minDelay: number;
   maxDelay: number;
}

// The christmas counterpart to the space theme's shooting star / halloween's
// ghost drift: a sleigh gliding across the sky every so often in a gentle
// arc, same spawn-timer + direct sprite mutation pattern as those two -
// rare enough (long delay range) to read as a small surprise, not a loop.
function SantaFlyby({ minDelay, maxDelay }: SantaFlybyProps) {
   const ref = useRef<THREE.Sprite>(null);
   // Mirrored via the texture's own repeat/offset (rather than a negative
   // sprite scale, which doesn't reliably flip a Sprite's UV mapping) when
   // flying right-to-left, so the reindeer stay on the leading edge either
   // way instead of trailing behind the sleigh.
   const texture = useMemo(() => {
      const tex = createSantaTexture();
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
   }, []);
   const flight = useRef({
      startX: 0,
      y: 0,
      z: 0,
      dir: 1,
      duration: 8,
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
         f.startX = f.dir === 1 ? -16 : 16;
         f.y = 3 + Math.random() * 3;
         f.z = -8 - Math.random() * 5;
         f.duration = 8 + Math.random() * 3;
         f.startedAt = t;
         f.nextAt = t + f.duration + minDelay + Math.random() * (maxDelay - minDelay);
      }

      const progress = elapsed / f.duration;
      if (progress >= 0 && progress <= 1) {
         const distance = 32;
         sprite.position.set(
            f.startX + f.dir * distance * progress,
            f.y + Math.sin(progress * Math.PI) * 1.8,
            f.z
         );
         texture.repeat.x = f.dir === 1 ? 1 : -1;
         texture.offset.x = f.dir === 1 ? 0 : 1;
         let opacity = 1;
         if (progress < 0.1) opacity = progress / 0.1;
         else if (progress > 0.85) opacity = 1 - (progress - 0.85) / 0.15;
         material.opacity = Math.max(0, opacity) * 0.9;
         sprite.visible = true;
      } else {
         sprite.visible = false;
      }
   });

   return (
      <sprite ref={ref} scale={[8.7, 1.8, 1]} visible={false}>
         <spriteMaterial map={texture} transparent opacity={0} depthWrite={false} />
      </sprite>
   );
}

// The ambient warm-glow sprites this used to render moved to ground level:
// the village silhouette's lit cabin windows carry that "warm light against
// dusk" job now, tied to something concrete instead of floating loose in
// the sky.
const NieveCanvas = () => (
   <div
      aria-hidden="true"
      className="w-full h-auto fixed inset-0 z-10 pointer-events-none bg-transparent flex"
   >
      <CanvasErrorBoundary>
         <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <SnowLayer count={700} size={0.08} speedRange={[0.006, 0.012]} zRange={[-32, -14]} opacity={0.45} drift={0.0006} />
            <SnowLayer count={1000} size={0.13} speedRange={[0.012, 0.022]} zRange={[-12, 8]} opacity={0.7} drift={0.001} />
            <SnowLayer count={450} size={0.19} speedRange={[0.02, 0.032]} zRange={[2, 13]} opacity={0.8} drift={0.0016} />
            <SantaFlyby minDelay={25} maxDelay={50} />
         </Canvas>
      </CanvasErrorBoundary>
   </div>
);

export default NieveCanvas;
