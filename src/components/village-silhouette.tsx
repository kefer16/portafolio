// Deterministic pseudo-random (not Math.random) so the layout is identical
// between server and client render - no hydration mismatch.
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

// A cabin silhouette (walls + pitched roof) with 1-2 warm lit windows -
// the thing the whole dusk palette is built to set off, the same role the
// pumpkin glow plays against halloween's near-black.
function housePath(cx: number, baseY: number, width: number, wallHeight: number, roofHeight: number) {
   const hw = width / 2;
   const wallTop = baseY - wallHeight;
   const roofTop = wallTop - roofHeight;
   const eave = hw * 1.15;
   return `${(cx - hw).toFixed(1)},${baseY} ${(cx - hw).toFixed(1)},${wallTop.toFixed(1)} ${(cx - eave).toFixed(1)},${wallTop.toFixed(1)} ${cx.toFixed(1)},${roofTop.toFixed(1)} ${(cx + eave).toFixed(1)},${wallTop.toFixed(1)} ${(cx + hw).toFixed(1)},${wallTop.toFixed(1)} ${(cx + hw).toFixed(1)},${baseY}`;
}

interface HouseRowProps {
   baseY: number;
   count: number;
   spacing: number;
   seedOffset: number;
   minWidth: number;
   maxWidth: number;
   minWallHeight: number;
   maxWallHeight: number;
   fill: string;
   opacity: number;
   windowSize: number;
}

function HouseRow({ baseY, count, spacing, seedOffset, minWidth, maxWidth, minWallHeight, maxWallHeight, fill, opacity, windowSize }: HouseRowProps) {
   const houses = Array.from({ length: count }, (_, i) => {
      const jitterX = (seededRandom(i + seedOffset) - 0.5) * spacing * 0.4;
      const cx = i * spacing + spacing / 2 + jitterX;
      const width = minWidth + seededRandom(i + seedOffset + 50) * (maxWidth - minWidth);
      const wallHeight = minWallHeight + seededRandom(i + seedOffset + 100) * (maxWallHeight - minWallHeight);
      const roofHeight = wallHeight * 0.55;
      const twoWindows = seededRandom(i + seedOffset + 150) > 0.4;
      const delay = seededRandom(i + seedOffset + 200) * 3;
      return { cx, width, wallHeight, roofHeight, twoWindows, delay, key: `${seedOffset}-${i}` };
   });

   return (
      <>
         <g fill={fill} fillOpacity={opacity}>
            {houses.map((house) => (
               <polygon key={house.key} points={housePath(house.cx, baseY, house.width, house.wallHeight, house.roofHeight)} />
            ))}
         </g>
         <g fill="#ffd98a">
            {houses.map((house) => {
               const wallMidY = baseY - house.wallHeight * 0.45;
               const offsets = house.twoWindows ? [-house.width * 0.2, house.width * 0.2] : [0];
               return offsets.map((dx, wi) => (
                  <rect
                     key={`${house.key}-w${wi}`}
                     x={(house.cx + dx - windowSize / 2).toFixed(1)}
                     y={(wallMidY - windowSize / 2).toFixed(1)}
                     width={windowSize}
                     height={windowSize}
                     rx={1.5}
                     style={{ animation: "christmas-twinkle 3.4s ease-in-out infinite", animationDelay: `${house.delay}s` }}
                  />
               ));
            })}
         </g>
      </>
   );
}

// Christmas theme only: a snowy village silhouette anchored to the bottom
// of the viewport, always in view while scrolling (like the other
// background layers). Pines further back for depth, cabins with glowing
// windows up front - the lit windows are the whole point of the dusk sky
// gradient in globals.css, the same way the pumpkin glow needs halloween's
// near-black to read.
function VillageSilhouette() {
   return (
      <div
         aria-hidden="true"
         className="hidden christmas-theme:block fixed bottom-0 inset-x-0 z-10 pointer-events-none h-[130px] sm:h-[170px]"
      >
         <svg
            viewBox="0 0 1600 220"
            preserveAspectRatio="xMidYMax slice"
            className="w-full h-full"
         >
            <TreeRow
               baseY={210}
               count={13}
               spacing={130}
               seedOffset={0}
               minHeight={55}
               maxHeight={90}
               minWidth={50}
               maxWidth={75}
               fill="#3a3068"
               opacity={0.5}
            />
            <HouseRow
               baseY={218}
               count={8}
               spacing={210}
               seedOffset={30}
               minWidth={70}
               maxWidth={100}
               minWallHeight={45}
               maxWallHeight={70}
               fill="#1c1530"
               opacity={0.85}
               windowSize={7}
            />
         </svg>
      </div>
   );
}

export default VillageSilhouette;
