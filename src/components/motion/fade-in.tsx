"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
   children: ReactNode;
   delay?: number;
   duration?: number;
   direction?: "up" | "left" | "right" | "none";
   className?: string;
}

const offsets = {
   up: { y: 24 },
   left: { x: -24 },
   right: { x: 24 },
   none: {},
};

function FadeIn({ children, delay = 0, duration = 0.5, direction = "up", className }: FadeInProps) {
   const prefersReducedMotion = useReducedMotion();

   if (prefersReducedMotion) return <div className={className}>{children}</div>;

   return (
      <motion.div
         className={className}
         initial={{ opacity: 0, ...offsets[direction] }}
         whileInView={{ opacity: 1, x: 0, y: 0 }}
         viewport={{ once: true, margin: "-80px" }}
         transition={{ duration, delay, ease: "easeOut" }}
      >
         {children}
      </motion.div>
   );
}

export default FadeIn;
