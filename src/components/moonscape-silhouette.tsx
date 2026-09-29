// Deterministic pseudo-random (not Math.random) so the terrain is identical
// between server and client render - no hydration mismatch.
function seededRandom(seed: number) {
   const x = Math.sin(seed) * 10000;
   return x - Math.floor(x);
}

// Gentle rolling terrain instead of jagged mountain peaks - a mountain
// range read as a generic nightscape, not specifically "space"; a low,
// undulating alien plain reads as a moon/planet surface instead.
function terrainPoints(baseY: number, width: number, segments: number, seedOffset: number, amplitude: number) {
   const step = width / segments;
   const pts: [number, number][] = [];
   for (let i = 0; i <= segments; i++) {
      const x = i * step;
      const h = seededRandom(i + seedOffset) * amplitude;
      pts.push([x, baseY - h]);
   }
   return pts;
}

// Quadratic curves through the midpoints between each pair of sampled
// points, using the points themselves as control points - the standard
// trick for turning a jagged polyline into a smooth rolling one.
function terrainPath(points: [number, number][], baseY: number, width: number) {
   let d = `M0,${baseY.toFixed(1)} L${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
   for (let i = 1; i < points.length; i++) {
      const [px, py] = points[i - 1];
      const [x, y] = points[i];
      const midX = (px + x) / 2;
      const midY = (py + y) / 2;
      d += ` Q${px.toFixed(1)},${py.toFixed(1)} ${midX.toFixed(1)},${midY.toFixed(1)}`;
   }
   const [lastX, lastY] = points[points.length - 1];
   d += ` L${lastX.toFixed(1)},${lastY.toFixed(1)} L${width.toFixed(1)},${baseY.toFixed(1)} Z`;
   return d;
}

interface TerrainRowProps {
   baseY: number;
   width: number;
   segments: number;
   seedOffset: number;
   amplitude: number;
   fill: string;
   opacity: number;
}

function TerrainRow({ baseY, width, segments, seedOffset, amplitude, fill, opacity }: TerrainRowProps) {
   const points = terrainPoints(baseY, width, segments, seedOffset, amplitude);
   return <path d={terrainPath(points, baseY, width)} fill={fill} fillOpacity={opacity} />;
}

interface CraterRowProps {
   baseY: number;
   count: number;
   spacing: number;
   seedOffset: number;
   minR: number;
   maxR: number;
   rim: string;
}

// Flattened ellipse outlines sitting low on the ground - the classic
// cartoon-moon-surface crater, and the plainest possible cue that this is
// an alien surface rather than an earthly one.
function CraterRow({ baseY, count, spacing, seedOffset, minR, maxR, rim }: CraterRowProps) {
   const craters = Array.from({ length: count }, (_, i) => {
      const jitterX = (seededRandom(i + seedOffset) - 0.5) * spacing * 0.5;
      const cx = i * spacing + spacing / 2 + jitterX;
      const r = minR + seededRandom(i + seedOffset + 50) * (maxR - minR);
      const cy = baseY - r * 0.32;
      return { cx, cy, r, key: i };
   });

   return (
      <g fill="none" stroke={rim} strokeOpacity={0.3} strokeWidth={1.2}>
         {craters.map((c) => (
            <ellipse key={c.key} cx={c.cx} cy={c.cy} rx={c.r} ry={c.r * 0.4} />
         ))}
      </g>
   );
}

// A small radio dish standing on the plain, in place of the earlier
// observatory dome - the scene's one specific, technological touch
// (matching the village's lit windows / halloween's cobwebs), and the
// reason to be listening from way out here. The rim-light stroke is the
// single accent color popping against the near-black ground, the same
// trick the other two themes use for their one warm color note.
function RadioDish({ cx, baseY, scale = 1 }: { cx: number; baseY: number; scale?: number }) {
   const poleH = 24 * scale;
   const poleTopY = baseY - poleH;
   const dishRx = 17 * scale;
   const dishRy = 8 * scale;
   const dishCy = poleTopY - dishRy * 0.2;
   const feedX = cx - 15 * scale;
   const feedY = dishCy - 12 * scale;

   return (
      <g stroke="#8fa8ff" strokeOpacity={0.55} strokeWidth={1.6 * scale} strokeLinecap="round" fill="none">
         <line x1={cx} y1={baseY} x2={cx} y2={poleTopY} />
         <ellipse
            cx={cx}
            cy={dishCy}
            rx={dishRx}
            ry={dishRy}
            transform={`rotate(-20 ${cx} ${dishCy})`}
            fill="#0d1024"
            fillOpacity={0.9}
            strokeOpacity={0.45}
         />
         <line x1={cx} y1={dishCy} x2={feedX} y2={feedY} />
         <circle cx={feedX} cy={feedY} r={2.2 * scale} fill="#8fa8ff" fillOpacity={0.6} stroke="none" />
      </g>
   );
}

// Space theme only: a cratered alien plain anchoring the starfield to a
// specific place, the ground layer the theme was missing while christmas
// and halloween both had one (village, graveyard) - a mountain range read
// as any generic nightscape, this reads unmistakably as space. Fixed to
// the bottom of the viewport like the other two silhouettes.
function MoonscapeSilhouette() {
   const width = 1600;

   return (
      <div
         aria-hidden="true"
         className="hidden space-theme:block fixed bottom-0 inset-x-0 z-10 pointer-events-none h-[130px] sm:h-[170px]"
      >
         <svg
            viewBox={`0 0 ${width} 220`}
            preserveAspectRatio="xMidYMax slice"
            className="w-full h-full"
         >
            <TerrainRow baseY={205} width={width} segments={10} seedOffset={0} amplitude={22} fill="#4a5a94" opacity={0.5} />
            <TerrainRow baseY={216} width={width} segments={14} seedOffset={30} amplitude={16} fill="#262f5c" opacity={0.92} />
            <CraterRow baseY={216} count={7} spacing={220} seedOffset={5} minR={10} maxR={20} rim="#8fa8ff" />
            <RadioDish cx={520} baseY={216} scale={1} />
            <RadioDish cx={1180} baseY={216} scale={0.75} />
         </svg>
      </div>
   );
}

export default MoonscapeSilhouette;
