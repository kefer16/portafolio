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

function createWarmGlowTexture(rgb: string) {
   const canvas = document.createElement("canvas");
   canvas.width = 256;
   canvas.height = 256;
   const ctx = canvas.getContext("2d");
   if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, `rgba(${rgb}, 0.55)`);
      gradient.addColorStop(0.45, `rgba(${rgb}, 0.25)`);
      gradient.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
   }
   return new THREE.CanvasTexture(canvas);
}

interface WarmGlowProps {
   rgb: string;
   position: [number, number, number];
   scale: number;
   opacity: number;
}

// Soft warm patches standing in for string-light glow, the light-theme
// counterpart to the dark theme's nebula clouds. Normal (non-additive)
// blending here, unlike the nebula: additive light washes out against this
// bright sky-blue background instead of glowing the way it does over near-
// black, so a plain soft-edged blob reads better.
function WarmGlow({ rgb, position, scale, opacity }: WarmGlowProps) {
   const texture = useMemo(() => createWarmGlowTexture(rgb), [rgb]);

   return (
      <sprite position={position} scale={[scale, scale, 1]}>
         <spriteMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
      </sprite>
   );
}

function ChristmasLightsGlow() {
   return (
      <>
         <WarmGlow rgb="255, 196, 102" position={[9, 5, -10]} scale={18} opacity={0.4} />
         <WarmGlow rgb="255, 165, 90" position={[-10, -6, -18]} scale={22} opacity={0.32} />
         <WarmGlow rgb="255, 214, 140" position={[1, -8, -6]} scale={14} opacity={0.3} />
      </>
   );
}

const NieveCanvas = () => (
   <div
      aria-hidden="true"
      className="w-full h-auto fixed inset-0 z-10 pointer-events-none bg-transparent flex"
   >
      <CanvasErrorBoundary>
         <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <ChristmasLightsGlow />
            <SnowLayer count={700} size={0.08} speedRange={[0.006, 0.012]} zRange={[-32, -14]} opacity={0.45} drift={0.0006} />
            <SnowLayer count={1000} size={0.13} speedRange={[0.012, 0.022]} zRange={[-12, 8]} opacity={0.7} drift={0.001} />
            <SnowLayer count={450} size={0.19} speedRange={[0.02, 0.032]} zRange={[2, 13]} opacity={0.8} drift={0.0016} />
         </Canvas>
      </CanvasErrorBoundary>
   </div>
);

export default NieveCanvas;
