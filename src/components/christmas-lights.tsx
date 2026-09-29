// Deterministic pseudo-random (not Math.random) so bulb timing is identical
// between server and client render - no hydration mismatch.
function seededRandom(seed: number) {
   const x = Math.sin(seed) * 10000;
   return x - Math.floor(x);
}

const BULB_COLORS = ["#e6362a", "#f5b301", "#2e9e4f", "#2f6fed"]; // red, gold, green, blue

interface ChristmasLightsProps {
   count?: number;
}

// A string-light garland hanging from the header, the light theme's most
// literal "Christmas" cue - red included front and center, since the rest
// of the theme (snow, warm glow) reads more generically wintery than
// specifically festive.
function ChristmasLights({ count = 16 }: ChristmasLightsProps) {
   const width = 1600;
   const height = 46;
   const spacing = width / count;
   const anchorY = 4;
   const dipY = 22;
   const bulbY = 34;

   let wirePath = `M 0,${anchorY}`;
   for (let i = 0; i < count; i++) {
      const midX = i * spacing + spacing / 2;
      const endX = (i + 1) * spacing;
      wirePath += ` Q ${midX.toFixed(1)},${dipY} ${endX.toFixed(1)},${anchorY}`;
   }

   const bulbs = Array.from({ length: count }, (_, i) => ({
      cx: i * spacing + spacing / 2,
      color: BULB_COLORS[i % BULB_COLORS.length],
      delay: seededRandom(i + 1) * 2.4,
      key: i,
   }));

   return (
      <div aria-hidden="true" className="hidden christmas-theme:block w-full h-[46px] pointer-events-none select-none">
         <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMin slice"
            className="w-full h-full overflow-visible"
         >
            <path d={wirePath} fill="none" stroke="#33404d" strokeWidth="1.5" opacity="0.55" />
            {bulbs.map((bulb) => (
               <g
                  key={bulb.key}
                  style={{ animation: "christmas-twinkle 2.6s ease-in-out infinite", animationDelay: `${bulb.delay}s` }}
               >
                  <line x1={bulb.cx} y1={dipY} x2={bulb.cx} y2={bulbY - 5} stroke="#33404d" strokeWidth="1.2" opacity="0.55" />
                  <circle cx={bulb.cx} cy={bulbY} r="7" fill={bulb.color} opacity="0.35" />
                  <circle cx={bulb.cx} cy={bulbY} r="3.5" fill={bulb.color} />
               </g>
            ))}
         </svg>
      </div>
   );
}

export default ChristmasLights;
