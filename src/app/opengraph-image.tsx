import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Imapos — Smarter F&B Operations with Modern POS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(weight: 400 | 500 | 700) {
  const res = await fetch(
    `https://fonts.googleapis.com/css2?family=DM+Sans:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    },
  );
  const css = await res.text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error("Font URL not found");
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

export default async function OGImage() {
  const [regular, medium, bold] = await Promise.all([
    loadFont(400),
    loadFont(500),
    loadFont(700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #fef2db 0%, #fcf7ef 55%, #fcf7ef 100%)",
          position: "relative",
          fontFamily: "DM Sans",
        }}
      >
        {/* Radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(162,123,92,0.32) 0%, rgba(162,123,92,0.10) 45%, rgba(162,123,92,0) 75%)",
          }}
        />
        {/* Soft secondary glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -200,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(63,78,79,0.12) 0%, rgba(63,78,79,0) 70%)",
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            position: "relative",
          }}
        >
          <span style={{ color: "#a27b5c" }}>IMA</span>
          <span style={{ color: "#121212" }}>POS</span>
        </div>

        {/* Main copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            position: "relative",
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 80,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#121212",
            }}
          >
            <span>Smarter F&B Operations with&nbsp;</span>
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #a27b5c 0%, #6c523d 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Modern POS
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.35,
              color: "#52525b",
              maxWidth: 820,
            }}
          >
            The POS purpose-built for F&B operators — cafes, restaurants and
            cloud kitchens.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#52525b",
              letterSpacing: "-0.01em",
            }}
          >
            imapos.com
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 26px",
              borderRadius: 9999,
              background: "#a27b5c",
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              boxShadow: "0 12px 32px -16px rgba(162,123,92,0.7)",
            }}
          >
            Start free trial
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: regular, weight: 400, style: "normal" },
        { name: "DM Sans", data: medium, weight: 500, style: "normal" },
        { name: "DM Sans", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
