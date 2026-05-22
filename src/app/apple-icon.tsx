import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fcf7ef",
          borderRadius: 36,
          position: "relative",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 92,
            fontWeight: 600,
            letterSpacing: "-0.06em",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#a27b5c" }}>m</span>
          <span style={{ color: "#121212" }}>ise</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
