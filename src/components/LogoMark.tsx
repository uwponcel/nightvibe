import type { CSSProperties } from 'react';

/**
 * Barbier Boréal mark: a north-star glyph in a rounded square, drawn inline
 * so it scales cleanly at every size and inherits `currentColor` (always used
 * on dark surfaces here). Height-driven; width follows the 1:1 viewBox.
 */
export function LogoMark({
  height = 30,
  className,
  style,
}: {
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      role="img"
      aria-hidden="true"
      focusable="false"
      style={{ height, width: 'auto', display: 'block', ...style }}
    >
      <rect
        x="2.5"
        y="2.5"
        width="35"
        height="35"
        rx="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M20 9 L22 18 L31 20 L22 22 L20 31 L18 22 L9 20 L18 18 Z"
        fill="currentColor"
      />
    </svg>
  );
}
