import type { CSSProperties } from 'react';

/**
 * Night Vibe "N" monogram, rebuilt as two interlocking pieces split by a
 * single thin diagonal seam:
 *
 * Piece A (upper-left): left vertical bar fused with the full diagonal at the
 * top junction; the diagonal's foot lands at the bottom edge, beside the
 * right bar.
 *
 * Piece B (lower-right): right vertical bar fused with a parallel wedge-stub
 * that rises along the seam, its tip cut near the top edge.
 *
 * The seam between them runs parallel to the diagonal and exits exactly at
 * the right bar's bottom-left corner. It is the animation axis for the
 * lock/reveal intro.
 */

export interface LogoNParams {
  /** viewBox width */
  vw: number;
  /** viewBox height */
  vh: number;
  /** vertical bar width */
  bar: number;
  /** horizontal thickness of the diagonal stroke */
  diag: number;
  /** horizontal white seam width between the two pieces */
  seam: number;
  /** x of the diagonal's outer (left) edge at the top (overlaps the bar) */
  diagTopX: number;
  /** y where the left bar's bottom ends */
  leftBarEnd: number;
  /** y where the right bar's top starts */
  rightBarStart: number;
  /** y of the stub's horizontal tip cut */
  stubTipY: number;
}

export const DEFAULT_PARAMS: LogoNParams = {
  vw: 380,
  vh: 640,
  bar: 88,
  diag: 94,
  seam: 14,
  diagTopX: 76,
  leftBarEnd: 480,
  rightBarStart: 130,
  stubTipY: 85,
};

type Pt = [number, number];

function toPath(polys: Pt[][]): string {
  return polys
    .map(
      (poly) =>
        'M' +
        poly.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join('L') +
        'Z',
    )
    .join('');
}

function buildPieces(p: LogoNParams): { a: string; b: string } {
  const { vw, vh, bar, diag, seam, diagTopX, leftBarEnd, rightBarStart, stubTipY } = p;

  // The seam exits at the right bar's bottom-left corner. The diagonal's
  // seam-side (right) edge therefore lands `seam` left of that corner.
  const rightBarLeft = vw - bar;
  const footX = rightBarLeft - seam;
  // Horizontal slope (px per unit y) shared by diagonal, seam and stub.
  const s = (footX - (diagTopX + diag)) / vh;

  // Piece A: left bar + diagonal.
  const leftBar: Pt[] = [
    [0, 0],
    [bar, 0],
    [bar, leftBarEnd],
    [0, leftBarEnd],
  ];
  const diagonal: Pt[] = [
    [diagTopX, 0],
    [diagTopX + diag, 0],
    [footX, vh],
    [footX - diag, vh],
  ];

  // Piece B: right bar + stub. The stub's left edge runs `seam` right of the
  // diagonal's right edge; its body fuses into the bar lower down.
  const stubLeft = (y: number) => diagTopX + diag + seam + s * y;
  const rightBar: Pt[] = [
    [rightBarLeft, rightBarStart],
    [vw, rightBarStart],
    [vw, vh],
    [rightBarLeft, vh],
  ];
  const stub: Pt[] = [
    [stubLeft(stubTipY), stubTipY],
    [stubLeft(stubTipY) + diag, stubTipY],
    [stubLeft(vh) + diag, vh],
    [stubLeft(vh), vh],
  ];

  return { a: toPath([leftBar, diagonal]), b: toPath([rightBar, stub]) };
}

export interface LogoNProps {
  params?: Partial<LogoNParams>;
  color?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

export function LogoN({
  params,
  color = 'currentColor',
  className,
  style,
  title = 'Night Vibe',
}: LogoNProps) {
  const p: LogoNParams = { ...DEFAULT_PARAMS, ...params };
  const { a, b } = buildPieces(p);

  return (
    <svg
      viewBox={`0 0 ${p.vw} ${p.vh}`}
      className={className}
      style={style}
      role="img"
      aria-label={title}
      fill={color}
    >
      <g className="n-upper">
        <path d={a} />
      </g>
      <g className="n-lower">
        <path d={b} />
      </g>
    </svg>
  );
}
