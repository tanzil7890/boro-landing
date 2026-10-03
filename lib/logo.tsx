// Geometry for "Boro the bot": a bold "b" whose bowl is an eye, drawn in a 64×64 box.
// The glyph spans x 11–51, y 8–56. app/icon.svg mirrors these values.
export const LOGO = {
  body: "M11 13.5a5.5 5.5 0 0 1 11 0V28.73A16.5 16.5 0 1 1 34.5 56H15a4 4 0 0 1-4-4Z",
  eye: { cx: 34.5, cy: 39.5, r: 7.6 },
  // Resting pupil looks up and to the right, toward the wordmark.
  pupil: { dx: 2.5, dy: -2.4, r: 3.7 },
  // Happy closed eye, shown on hover.
  smile: "M28.3 40.1q6.2 4.2 12.4 0",
  glyphViewBox: "5 6 52 52",
  ink: "#07070A",
  stops: ["#9B7BFF", "#5B8CFF", "#22D3EE"],
} as const;

// Fits the glyph's 52-unit view box (5,6 → 57,58) into a 45-unit square at (9.5, 9.5) on the tile.
const TILE_GLYPH_TRANSFORM = "translate(9.5 9.5) scale(0.86538) translate(-5 -6)";

/** Static app-icon version (gradient tile, ink glyph) for generated images. `square` drops the corner radius. */
export function logoImage(size: number, { square = false } = {}) {
  const { eye, pupil } = LOGO;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="boro-tile" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0" stopColor={LOGO.stops[0]} />
          <stop offset="0.5" stopColor={LOGO.stops[1]} />
          <stop offset="1" stopColor={LOGO.stops[2]} />
        </linearGradient>
        <mask id="boro-eye">
          <rect x="0" y="0" width="64" height="64" fill="#fff" />
          <circle cx={eye.cx} cy={eye.cy} r={eye.r} fill="#000" />
        </mask>
      </defs>
      <rect width="64" height="64" rx={square ? 0 : 15} fill="url(#boro-tile)" />
      {/* Same placement as the nested <svg> in LogoMark; image renderers don't support nested viewBoxes. */}
      <g transform={TILE_GLYPH_TRANSFORM}>
        <path d={LOGO.body} fill={LOGO.ink} mask="url(#boro-eye)" />
        <circle cx={eye.cx + pupil.dx} cy={eye.cy + pupil.dy} r={pupil.r} fill={LOGO.ink} />
      </g>
    </svg>
  );
}
