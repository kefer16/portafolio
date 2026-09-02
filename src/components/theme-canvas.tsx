"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import StarsCanvas from "@/components/stars-canvas";
import NieveCanvas from "@/components/nieve-canvas";

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
