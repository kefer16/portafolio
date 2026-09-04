"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// @react-three/fiber runs react-reconciler as soon as its module is imported,
// which crashes Next's server-side render. next/dynamic with ssr:false keeps
// it out of the server bundle entirely (a plain "use client" isn't enough,
// since client components still get imported and rendered once on the server).
const StarsCanvas = dynamic(() => import("@/components/stars-canvas"), { ssr: false });
const NieveCanvas = dynamic(() => import("@/components/nieve-canvas"), { ssr: false });

/**
 * Mounts only the canvas for the active theme instead of hiding the other one
 * with CSS: a canvas kept mounted at 0x0 (display:none) still renders every
 * frame with a width/height-0 camera, producing NaN matrices.
 */
function ThemeCanvas() {
   const { resolvedTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => setMounted(true), []);

   if (!mounted) return null;

   return resolvedTheme === "light" ? <NieveCanvas /> : <StarsCanvas />;
}

export default ThemeCanvas;
