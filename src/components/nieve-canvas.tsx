"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props: any) => {
   const ref: any = useRef();
   const [sphere] = useState(() =>
      random.inSphere(new Float32Array(5000), { radius: 1.2 })
   );

   useFrame((_, delta) => {
      ref.current.rotation.x += delta / 7;
   });

   return (
      <group rotation={[0, 0, Math.PI / 100]}>
         <Points
            ref={ref}
            positions={sphere}
            stride={3}
            frustumCulled
            {...props}
         >
            <PointMaterial
               transparent
               size={0.005}
               sizeAttenuation={true}
               dethWrite={false}
            />
         </Points>
      </group>
   );
};

const NieveCanvas = ({ classString }: NieveCanvasProps) => (
   <div className={`w-full h-auto fixed inset-0 -z-60 ${classString}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
         <Suspense fallback={null}>
            <StarBackground />
         </Suspense>
      </Canvas>
   </div>
);

interface NieveCanvasProps {
   classString: string;
}

export default NieveCanvas;
