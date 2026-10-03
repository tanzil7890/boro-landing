import type { ReactNode } from "react";

// Tiny syntax highlighter for the TypeScript snippets in the mockups.
const TOKEN =
  /("[^"]*"|'[^']*')|\b(import|from|export|async|function|const|await|return|new|true|false)\b|(\/\/.*$)/g;

const palettes = {
  dark: { string: "text-[#a5d6ff]", keyword: "text-[#c4b5fd]", comment: "text-subtle" },
  light: { string: "text-[#0a3069]", keyword: "text-[#8250df]", comment: "text-[#59636e]" },
};

export function Highlight({ code, palette = "dark" }: { code: string; palette?: keyof typeof palettes }) {
  const colors = palettes[palette];
  const parts: ReactNode[] = [];
  let last = 0;

  for (const match of code.matchAll(TOKEN)) {
    const index = match.index;
    if (index > last) parts.push(code.slice(last, index));
    const className = match[1] ? colors.string : match[2] ? colors.keyword : colors.comment;
    parts.push(
      <span key={index} className={className}>
        {match[0]}
      </span>,
    );
    last = index + match[0].length;
  }
  if (last < code.length) parts.push(code.slice(last));

  return <>{parts}</>;
}
