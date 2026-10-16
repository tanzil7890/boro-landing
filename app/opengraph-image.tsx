import { ImageResponse } from "next/og";
import { site } from "@/lib/content";
import { logoImage } from "@/lib/logo";

export const alt = `${site.name} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 88,
          background: "#07070A",
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(124,92,255,0.35), transparent 50%), radial-gradient(circle at 90% 30%, rgba(34,211,238,0.18), transparent 45%)",
          color: "#EDEDEF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 44, fontWeight: 600 }}>
            {logoImage(64)}
            boro
          </div>
          <span style={{ fontSize: 28, color: "#8A8F98" }}>{site.domain}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 56,
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1.04,
          }}
        >
          <span>Every integration,</span>
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #7C5CFF, #22D3EE)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            always working.
          </span>
        </div>
        <div style={{ marginTop: 36, fontSize: 32, color: "#8A8F98" }}>
          Map · Watch · Test · Repair. Fixed before your customers notice.
        </div>
      </div>
    ),
    size,
  );
}
