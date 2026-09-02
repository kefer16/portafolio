"use client";

import { useState, useRef, Suspense, HTMLAttributes } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import CanvasErrorBoundary from "./canvas-error-boundary";

const StarBackground = (props: any) => {
   const ref: any = useRef();
   const [sphere] = useState(() => {
      // maath's default RNG can occasionally divide by a zero-length vector and
      // produce NaN positions (see https://github.com/pmndrs/maath/issues/9),
      // which breaks THREE's bounding-sphere calculation. Math.random() avoids it.
      const positions = random.inSphere(
         new Float32Array(5000),
         { radius: 1.2 },
         { value: Math.random }
      );
      for (let i = 0; i < positions.length; i++) {
         if (Number.isNaN(positions[i])) positions[i] = 0;
      }
      return positions;
   });

   useFrame((_, delta) => {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
   });

   return (
      <group rotation={[0, 0, Math.PI / 4]}>
         <Points
            ref={ref}
            positions={sphere}
            stride={3}
            frustumCulled={false}
            {...props}
         >
            <PointMaterial
               transparent
               size={0.004}
               sizeAttenuation={true}
               dethWrite={false}
            />
         </Points>
      </group>
   );
};

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
