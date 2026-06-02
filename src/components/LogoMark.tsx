import type { CSSProperties } from 'react';

/**
 * Official Night-Vibe "N" monogram (white variant on transparent), served
 * from /logo-white.png. Height-driven sizing; width follows the 883:1463
 * aspect ratio.
 */
export function LogoMark({
  height = 30,
  className,
  style,
  alt = '',
}: {
  height?: number | string;
  className?: string;
  style?: CSSProperties;
  alt?: string;
}) {
  return (
    <img
      src="/logo-white.png"
      alt={alt}
      className={className}
      style={{ height, width: 'auto', ...style }}
      width={883}
      height={1463}
    />
  );
}
