// Deterministic pseudo-random (not Math.random) so the layout is identical
// between server and client render - no hydration mismatch.
function seededRandom(seed: number) {
   const x = Math.sin(seed) * 10000;
   return x - Math.floor(x);
}

function bareTreePath(cx: number, baseY: number, height: number, seed: number) {
   const topY = baseY - height;
   const branchLen = height * 0.3;
   const parts = [`M${cx},${baseY} L${cx},${topY.toFixed(1)}`];
   const branchDefs = [
      { y: baseY - height * 0.9, angle: -35 },
      { y: baseY - height * 0.78, angle: 32 },
      { y: baseY - height * 0.6, angle: -48 },
      { y: baseY - height * 0.42, angle: 42 },
   ];
   branchDefs.forEach(({ y, angle }, i) => {
      const rad = (angle * Math.PI) / 180;
      const len = branchLen * (0.7 + seededRandom(seed + i) * 0.5);
      const x2 = cx + len * Math.sin(rad);
      const y2 = y - len * Math.cos(rad);
      parts.push(`M${cx},${y.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`);
   });
   return parts.join(" ");
}

function tombstonePath(cx: number, baseY: number, height: number, width: number) {
   const hw = width / 2;
   const topY = baseY - height;
   const archY = topY + hw;
   return `M${(cx - hw).toFixed(1)},${baseY} L${(cx - hw).toFixed(1)},${archY.toFixed(1)} A${hw.toFixed(1)},${hw.toFixed(1)} 0 0 1 ${(cx + hw).toFixed(1)},${archY.toFixed(1)} L${(cx + hw).toFixed(1)},${baseY} Z`;
}

interface BareTreeRowProps {
   baseY: number;
   count: number;
   spacing: number;
   seedOffset: number;
   minHeight: number;
   maxHeight: number;
   stroke: string;
   opacity: number;
}

function BareTreeRow({ baseY, count, spacing, seedOffset, minHeight, maxHeight, stroke, opacity }: BareTreeRowProps) {
   const trees = Array.from({ length: count }, (_, i) => {
      const jitterX = (seededRandom(i + seedOffset) - 0.5) * spacing * 0.5;
      const cx = i * spacing + spacing / 2 + jitterX;
      const height = minHeight + seededRandom(i + seedOffset + 50) * (maxHeight - minHeight);
      return { d: bareTreePath(cx, baseY, height, i + seedOffset), key: i };
   });

   return (
      <g fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity={opacity}>
         {trees.map((tree) => <path key={tree.key} d={tree.d} />)}
      </g>
   );
}

interface TombstoneRowProps {
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

function TombstoneRow({ baseY, count, spacing, seedOffset, minHeight, maxHeight, minWidth, maxWidth, fill, opacity }: TombstoneRowProps) {
   const stones = Array.from({ length: count }, (_, i) => {
      const jitterX = (seededRandom(i + seedOffset) - 0.5) * spacing * 0.5;
      const cx = i * spacing + spacing / 2 + jitterX;
      const height = minHeight + seededRandom(i + seedOffset + 50) * (maxHeight - minHeight);
      const width = minWidth + seededRandom(i + seedOffset + 100) * (maxWidth - minWidth);
      return { d: tombstonePath(cx, baseY, height, width), key: i };
   });

   return (
      <g fill={fill} fillOpacity={opacity}>
         {stones.map((stone) => <path key={stone.key} d={stone.d} />)}
      </g>
   );
}

// Halloween theme only, the graveyard counterpart to the light theme's pine
// treeline: bare trees further back, tombstones up front. Fixed to the
// bottom of the viewport the same way, for the same "always in view while
// scrolling" feel.
function SpookySilhouette() {
   return (
      <div
         aria-hidden="true"
         className="hidden halloween:block fixed bottom-0 inset-x-0 z-10 pointer-events-none h-[130px] sm:h-[170px]"
      >
         <svg
            viewBox="0 0 1600 220"
            preserveAspectRatio="xMidYMax slice"
            className="w-full h-full"
         >
            <BareTreeRow
               baseY={205}
               count={9}
               spacing={190}
               seedOffset={0}
               minHeight={80}
               maxHeight={130}
               stroke="#3a2d52"
               opacity={0.5}
            />
            <TombstoneRow
               baseY={216}
               count={13}
               spacing={130}
               seedOffset={40}
               minHeight={45}
               maxHeight={80}
               minWidth={38}
               maxWidth={58}
               fill="#241a38"
               opacity={0.8}
            />
         </svg>
      </div>
   );
}

export default SpookySilhouette;
