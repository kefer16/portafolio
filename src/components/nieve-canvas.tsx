"use client";

import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function SnowEffect() {
   const pointsRef = useRef<THREE.Points>(null);

   const particlesCount = 2000;

   const positions = useMemo(() => {
      const positions = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount; i++) {
         const i3 = i * 3;
         positions[i3] = (Math.random() - 0.5) * 50;
         positions[i3 + 1] = Math.random() * 50;
         positions[i3 + 2] = (Math.random() - 0.5) * 50;
      }

      return positions;
   }, []);

   const speeds = useMemo(() => {
      return new Float32Array(particlesCount).map(() => Math.random() * 0.02 + 0.01);
   }, []);

   useFrame((state) => {
      if (!pointsRef.current) return;

      const positions = pointsRef.current.geometry.attributes.position
         .array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
         const i3 = i * 3;

         positions[i3 + 1] -= speeds[i];

         positions[i3] += Math.sin(state.clock.elapsedTime + i) * 0.001;
         positions[i3 + 2] += Math.cos(state.clock.elapsedTime + i) * 0.001;

         if (positions[i3 + 1] < -25) {
            positions[i3 + 1] = 25;
            positions[i3] = (Math.random() - 0.5) * 50;
            positions[i3 + 2] = (Math.random() - 0.5) * 50;
         }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
   });

   return (
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
         <PointMaterial
            transparent
            color="#ffffff"
            size={0.15}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.8}
         />
      </Points>
   );
}


const NieveCanvas = ({ classString }: NieveCanvasProps) => (
   <div className={`w-full h-auto fixed inset-0 -z-60 ${classString}`}>
      <Canvas
         camera={{ position: [0, 0, 15], fov: 75 }}

      >
         <SnowEffect />
      </Canvas>
   </div>
);

interface NieveCanvasProps {
   classString: string;
}

export default NieveCanvas;
