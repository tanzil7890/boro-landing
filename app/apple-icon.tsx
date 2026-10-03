import { ImageResponse } from "next/og";
import { logoImage } from "@/lib/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>{logoImage(180, { square: true })}</div>
    ),
    size,
  );
}
