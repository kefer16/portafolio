const SPOKE_ANGLES = [0, 22.5, 45, 67.5, 90];
const SPOKE_LENGTH = 110;
const RING_FRACTIONS = [0.32, 0.58, 0.84];

const SPOKE_POINTS = SPOKE_ANGLES.map((deg) => {
   const rad = (deg * Math.PI) / 180;
   return { x: SPOKE_LENGTH * Math.cos(rad), y: SPOKE_LENGTH * Math.sin(rad) };
});

const SPOKE_PATHS = SPOKE_POINTS.map((p) => `M0,0 L${p.x.toFixed(1)},${p.y.toFixed(1)}`);

const RING_PATHS = RING_FRACTIONS.map((f) =>
   SPOKE_POINTS.map((p, i) => `${i === 0 ? "M" : "L"}${(p.x * f).toFixed(1)},${(p.y * f).toFixed(1)}`).join(" ")
);

function CobwebCorner({ flip }: { flip?: boolean }) {
   return (
      <svg
         viewBox="0 0 110 110"
         className={`w-14 h-14 sm:w-20 sm:h-20 ${flip ? "-scale-x-100" : ""}`}
      >
         <g fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.5">
            {SPOKE_PATHS.map((d, i) => <path key={`spoke-${i}`} d={d} />)}
            {RING_PATHS.map((d, i) => <path key={`ring-${i}`} d={d} />)}
         </g>
      </svg>
   );
}

// Halloween theme's header flourish, the counterpart to the light theme's
// string lights: cobwebs tucked into the top corners rather than a strip
// hanging below, since a web reads at a corner and would look odd repeated
// across a whole width.
function SpookyCobwebs() {
   return (
      <div
         aria-hidden="true"
         className="hidden halloween:flex absolute top-0 inset-x-0 justify-between pointer-events-none select-none z-0 overflow-hidden"
      >
         <CobwebCorner />
         <CobwebCorner flip />
      </div>
   );
}

export default SpookyCobwebs;
