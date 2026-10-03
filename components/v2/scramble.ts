const GLYPHS = "!<>-_\\/[]{}=+*^?#%&$@01";

/** Deterministic pseudo-random number in [0, 1) for a given input (safe to call during render). */
export function noise(n: number) {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Replaces roughly `amount` (0–1) of the characters with glitch glyphs. Same inputs, same output. */
export function scramble(text: string, amount: number, seed = 0) {
  if (amount <= 0) return text;
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    out += ch === " " || noise(i + seed * 101) >= amount ? ch : GLYPHS[Math.floor(noise(i * 7 + seed * 13) * GLYPHS.length)];
  }
  return out;
}
