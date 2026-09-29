// Deterministic pseudo-random (not Math.random) so the tree layout is
// identical between server and client render - no hydration mismatch.
function seededRandom(seed: number) {
   const x = Math.sin(seed) * 10000;
   return x - Math.floor(x);
}

// A single pine's zig-zag silhouette (layered-branches look), centered on
// cx with its base sitting on baseY.
function pinePoints(cx: number, baseY: number, height: number, width: number) {
   const hw = width / 2;
   const pts: [number, number][] = [
      [cx - hw, baseY],
      [cx - hw * 0.6, baseY - height * 0.28],
      [cx - hw * 0.75, baseY - height * 0.28],
      [cx - hw * 0.35, baseY - height * 0.55],
      [cx - hw * 0.5, baseY - height * 0.55],
      [cx - hw * 0.25, baseY - height * 0.8],
      [cx - hw * 0.4, baseY - height * 0.8],
      [cx, baseY - height],
      [cx + hw * 0.4, baseY - height * 0.8],
      [cx + hw * 0.25, baseY - height * 0.8],
      [cx + hw * 0.5, baseY - height * 0.55],
      [cx + hw * 0.35, baseY - height * 0.55],
      [cx + hw * 0.75, baseY - height * 0.28],
      [cx + hw * 0.6, baseY - height * 0.28],
      [cx + hw, baseY],
   ];
   return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

interface TreeRowProps {
   baseY: number;
   count: number;
   spacing: number;
   seedOffset: number;
   minHeight: number;
   maxHeight: number;
   minWidth: number;
   maxWidth: number;
   fill: string;
   opacity: number;
}

function TreeRow({ baseY, count, spacing, seedOffset, minHeight, maxHeight, minWidth, maxWidth, fill, opacity }: TreeRowProps) {
   const trees = Array.from({ length: count }, (_, i) => {
      const jitterX = (seededRandom(i + seedOffset) - 0.5) * spacing * 0.6;
      const cx = i * spacing + jitterX;
      const height = minHeight + seededRandom(i + seedOffset + 50) * (maxHeight - minHeight);
      const width = minWidth + seededRandom(i + seedOffset + 100) * (maxWidth - minWidth);
      return { cx, height, width, key: `${seedOffset}-${i}` };
   });

   return (
      <g fill={fill} fillOpacity={opacity}>
         {trees.map((tree) => (
            <polygon key={tree.key} points={pinePoints(tree.cx, baseY, tree.height, tree.width)} />
         ))}
      </g>
   );
}

// Light theme only, the winter-evening counterpart to the dark theme's
// starfield: a treeline anchored to the bottom of the viewport, always in
// view while scrolling (like the other background layers). The footer text
// getting a padding-bottom in globals.css is what keeps it from being cut
// off by the trees.
function PineSilhouette() {
   return (
      <div
         aria-hidden="true"
         className="hidden light-theme:block fixed bottom-0 inset-x-0 z-10 pointer-events-none h-[130px] sm:h-[170px]"
      >
         <svg
            viewBox="0 0 1600 220"
            preserveAspectRatio="xMidYMax slice"
            className="w-full h-full"
         >
            <TreeRow
               baseY={210}
               count={15}
               spacing={115}
               seedOffset={0}
               minHeight={60}
               maxHeight={95}
               minWidth={55}
               maxWidth={80}
               fill="#4a6b8a"
               opacity={0.45}
            />
            <TreeRow
               baseY={215}
               count={12}
               spacing={145}
               seedOffset={30}
               minHeight={100}
               maxHeight={155}
               minWidth={75}
               maxWidth={110}
               fill="#1f3b57"
               opacity={0.75}
            />
         </svg>
      </div>
   );
}

export default PineSilhouette;
