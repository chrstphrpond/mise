import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/DMSans";

const { fontFamily } = loadFont();

// -----------------------------------------------------------------------------
// Timing constants
// -----------------------------------------------------------------------------
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Beat structure (450 frames / 15.0s)
const BEAT = {
  brandSlam: { from: 0, len: 45 },        // 1.5s — wordmark slam
  tagline: { from: 30, len: 75 },         // 2.5s, overlaps slam by 15f
  heroWide: { from: 105, len: 60 },       // 2.0s — site wide
  heroDetail: { from: 155, len: 60 },     // 2.0s — iPad zoom (overlap 10)
  solution: { from: 205, len: 60 },       // 2.0s — w/ callout
  features: { from: 255, len: 55 },       // 1.83s — quick stack
  pricing: { from: 300, len: 60 },        // 2.0s — glow
  testimonial: { from: 350, len: 45 },    // 1.5s — typewriter
  outro: { from: 385, len: 65 },          // 2.17s — slam
};

export const DURATION_IN_FRAMES = BEAT.outro.from + BEAT.outro.len;

// -----------------------------------------------------------------------------
// Palette (mirrors src/app/globals.css)
// -----------------------------------------------------------------------------
const C = {
  cream: "#fcf7ef",
  creamDeep: "#fef2db",
  primary: "#a27b5c",
  primaryDeep: "#6c523d",
  primaryDark: "#36291f",
  ink: "#0c0c0c",
  inkSoft: "#1a1a1a",
  inkMuted: "#5b574f",
};

const EASE_EXPO_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_OUT_QUART = Easing.bezier(0.25, 1, 0.5, 1);
// Symmetric ease-in-out: slow start → faster mid → slow end. This is the curve
// cinematic Ken Burns / dolly-in shots use — feels deliberate rather than
// reactive, which is what ease-out-only on a slow zoom reads as.
const EASE_ZOOM = Easing.bezier(0.45, 0, 0.55, 1);

// -----------------------------------------------------------------------------
// Per-char blur reveal (mirrors the site's BlurTextEffect)
// -----------------------------------------------------------------------------
function BlurChars({
  text,
  delay = 0,
  perChar = 0.025,
  size,
  color,
  weight = 500,
  letterSpacing = "-0.03em",
  inline = false,
}: {
  text: string;
  delay?: number;
  perChar?: number;
  size: number;
  color: string;
  weight?: number;
  letterSpacing?: string;
  inline?: boolean;
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <span
      style={{
        fontFamily,
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing,
        lineHeight: 1.04,
        display: inline ? "inline" : "inline-flex",
        flexWrap: "wrap",
      }}
    >
      {Array.from(text).map((ch, i) => {
        const charStart = delay + i * perChar * fps;
        const local = frame - charStart;
        const p = interpolate(local, [0, fps * 0.35], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_EXPO_OUT,
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${(1 - p) * 22}px)`,
              filter: `blur(${(1 - p) * 10}px)`,
              whiteSpace: "pre",
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Color grade layer — warm Stripe-ish tone over the whole composition
// -----------------------------------------------------------------------------
function ColorGrade({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        filter: "sepia(0.06) contrast(1.04) saturate(1.08)",
      }}
    >
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Vignette + film grain — top overlay
// -----------------------------------------------------------------------------
function Vignette() {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(75% 70% at 50% 50%, transparent 40%, rgba(12,12,12,0.18) 100%)",
        pointerEvents: "none",
        mixBlendMode: "multiply",
      }}
    />
  );
}

function Grain() {
  const frame = useCurrentFrame();
  // Re-seed every 2 frames so the noise crawls instead of staying static.
  const seed = Math.floor(frame / 2);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity: 0.07,
        mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed={seed}
          />
          <feColorMatrix
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// Light-leak burst (cheap, GPU-friendly alt to @remotion/light-leaks)
// -----------------------------------------------------------------------------
function LightLeakBurst({
  duration,
  hue = 28,
  side = "left",
}: {
  duration: number;
  hue?: number;
  side?: "left" | "right" | "top";
}) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration / 2, duration], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_QUART,
  });
  const opacity = p * 0.55;
  const x = side === "left" ? -20 : side === "right" ? 120 : 50;
  const y = side === "top" ? -10 : 50;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity,
        mixBlendMode: "screen",
        background: `radial-gradient(60% 90% at ${x}% ${y}%, hsla(${hue}, 90%, 78%, 0.95) 0%, hsla(${hue}, 90%, 60%, 0.55) 25%, transparent 60%)`,
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Crossfade wrapper — fades a child in and out at sequence edges
// -----------------------------------------------------------------------------
function Crossfade({
  in: fadeIn = 8,
  out: fadeOut = 8,
  duration,
  children,
}: {
  in?: number;
  out?: number;
  duration: number;
  children: React.ReactNode;
}) {
  const frame = useCurrentFrame();
  const opacity =
    interpolate(frame, [0, fadeIn], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT_QUART,
    }) *
    interpolate(frame, [duration - fadeOut, duration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT_QUART,
    });
  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// B1 · Brand slam — "mise." wordmark drops with spring snap, dot pop-tints
// -----------------------------------------------------------------------------
function BrandSlam() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slam = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 130 },
    durationInFrames: 30,
  });

  const dotPop = spring({
    frame: frame - 18,
    fps,
    config: { mass: 0.4, damping: 8, stiffness: 200 },
  });

  const drift = interpolate(frame, [25, 45], [0, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_EXPO_OUT,
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(65% 55% at 50% 45%, ${C.creamDeep} 0%, ${C.cream} 70%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          transform: `translateY(${drift}px) scale(${0.85 + slam * 0.15})`,
          opacity: slam,
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 320,
            fontWeight: 500,
            color: C.ink,
            letterSpacing: "-0.05em",
            lineHeight: 0.85,
          }}
        >
          mise
        </span>
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 44,
            height: 44,
            borderRadius: 999,
            background: C.primary,
            marginLeft: 8,
            marginBottom: 28,
            transform: `scale(${dotPop})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// B2 · Tagline reveal — "Smarter F&B Operations / with Modern POS"
// -----------------------------------------------------------------------------
function TaglineReveal({ duration }: { duration: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
    easing: EASE_EXPO_OUT,
  });

  const lineW = interpolate(frame, [fps * 1.1, fps * 1.8], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_EXPO_OUT,
  });

  const lineX = interpolate(frame, [duration - 12, duration], [0, -40], {
    extrapolateLeft: "clamp",
    easing: EASE_EXPO_OUT,
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(60% 55% at 50% 40%, ${C.creamDeep} 0%, ${C.cream} 70%)`,
        justifyContent: "center",
        alignItems: "center",
        transform: `translateX(${lineX}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            opacity: eyebrowOpacity,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 22px",
            borderRadius: 999,
            background: "rgba(162,123,92,0.12)",
            color: C.primaryDeep,
            fontFamily,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: C.primary,
            }}
          />
          One POS to Power Your F&B
        </div>

        <BlurChars
          text="Smarter F&B Operations"
          delay={fps * 0.2}
          size={108}
          color={C.ink}
        />
        <div style={{ marginTop: -6 }}>
          <span style={{ fontFamily, fontSize: 108, color: C.ink, marginRight: 18, letterSpacing: "-0.03em" }}>
            <BlurChars
              text="with"
              delay={fps * 0.85}
              size={108}
              color={C.ink}
              inline
            />
          </span>
          <BlurChars
            text="Modern POS"
            delay={fps * 1.05}
            size={108}
            color={C.primary}
            inline
          />
        </div>

        <div
          style={{
            marginTop: 14,
            width: lineW,
            height: 4,
            background: C.primary,
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// Dolly-in screenshot — scale-only push toward a single focal point. Pan is
// intentionally absent: combining translate + scale on a slow shot reads as
// mechanical (the eye sees two moves competing), whereas a single transform
// around a well-placed origin reads as one fluid camera move.
// -----------------------------------------------------------------------------
function DollyIn({
  src,
  duration,
  fromScale = 1.0,
  toScale = 1.06,
  originX = 50,
  originY = 50,
  objectPositionY = "top",
}: {
  src: string;
  duration: number;
  fromScale?: number;
  toScale?: number;
  originX?: number;
  originY?: number;
  objectPositionY?: string;
}) {
  const frame = useCurrentFrame();
  const t = frame / duration;
  const scale = interpolate(t, [0, 1], [fromScale, toScale], {
    extrapolateRight: "clamp",
    easing: EASE_ZOOM,
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: C.cream }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: `center ${objectPositionY}`,
          transform: `scale(${scale})`,
          transformOrigin: `${originX}% ${originY}%`,
          willChange: "transform",
        }}
      />
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// UI callout — animated ring + label that floats in at a specific frame
// -----------------------------------------------------------------------------
function Callout({
  x,
  y,
  label,
  appearAt,
  duration,
  side = "right",
}: {
  x: number;
  y: number;
  label: string;
  appearAt: number;
  duration: number;
  side?: "left" | "right";
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = interpolate(frame, [appearAt, appearAt + fps * 0.35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_EXPO_OUT,
  });
  const exit = interpolate(
    frame,
    [duration - fps * 0.3, duration],
    [1, 0],
    { extrapolateLeft: "clamp", easing: EASE_EXPO_OUT },
  );
  const opacity = enter * exit;
  const ringScale = 0.6 + enter * 0.4;
  const pulse =
    1 + Math.sin(((frame - appearAt) / fps) * Math.PI * 2 * 1.5) * 0.04;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          transform: "translate(-50%, -50%)",
          opacity,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 999,
            border: `3px solid ${C.primary}`,
            boxShadow: `0 0 0 6px rgba(162,123,92,0.18), 0 20px 60px -20px rgba(108,82,61,0.45)`,
            transform: `scale(${ringScale * pulse})`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: `${side === "right" ? x + 7 : x - 7}%`,
          top: `${y}%`,
          transform: `translate(${side === "right" ? "0" : "-100%"}, -50%) translateY(${(1 - enter) * 10}px)`,
          opacity,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 20px",
            borderRadius: 999,
            background: "rgba(12,12,12,0.92)",
            color: C.cream,
            fontFamily,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            boxShadow: "0 20px 60px -20px rgba(12,12,12,0.5)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: C.primary,
            }}
          />
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// Section chip — small index/label pill in a corner
// -----------------------------------------------------------------------------
function SectionChip({
  index,
  total,
  label,
  appearAt = 0,
  duration,
}: {
  index: number;
  total: number;
  label: string;
  appearAt?: number;
  duration: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [appearAt, appearAt + fps * 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_EXPO_OUT,
  });
  const exit = interpolate(
    frame,
    [duration - fps * 0.2, duration],
    [1, 0],
    { extrapolateLeft: "clamp", easing: EASE_EXPO_OUT },
  );
  const opacity = enter * exit;
  const y = (1 - enter) * 16;

  return (
    <div
      style={{
        position: "absolute",
        left: 64,
        bottom: 64,
        opacity,
        transform: `translateY(${y}px)`,
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 22px",
        borderRadius: 999,
        background: "rgba(252,247,239,0.88)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 20px 60px -28px rgba(12,12,12,0.4)",
        fontFamily,
        fontSize: 22,
        fontWeight: 500,
        color: C.ink,
        letterSpacing: "-0.01em",
      }}
    >
      <span style={{ color: C.primary, fontVariantNumeric: "tabular-nums" }}>
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <span
        aria-hidden
        style={{
          width: 1,
          height: 18,
          background: "rgba(12,12,12,0.18)",
        }}
      />
      <span>{label}</span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// B3 · Hero wide — full marketing site, slow dolly-in toward the headline.
// The push lands at roughly the framing B4 will start from, so the light leak
// between them reads as a continuous camera move into the iPad mockup rather
// than a teleport.
// -----------------------------------------------------------------------------
function HeroWide({ duration }: { duration: number }) {
  return (
    <AbsoluteFill>
      <DollyIn
        src="screens/01-hero.png"
        duration={duration}
        fromScale={1.0}
        toScale={1.08}
        originX={50}
        originY={62}
        objectPositionY="top"
      />
      <SectionChip
        index={1}
        total={5}
        label="Hero · marketing site"
        appearAt={14}
        duration={duration}
      />
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// B4 · Hero detail — continues the dolly from B3 deeper into the iPad mockup.
// Starts at roughly the framing B3 ended at (scale ~1.10 around the lower
// half), ends tight on the dashboard tile so the menu items and order column
// are readable. Match-cut motion, not a teleport.
// -----------------------------------------------------------------------------
function HeroDetail({ duration }: { duration: number }) {
  return (
    <AbsoluteFill>
      <DollyIn
        src="screens/01-hero.png"
        duration={duration}
        fromScale={1.12}
        toScale={1.45}
        originX={50}
        originY={82}
        objectPositionY="top"
      />
      <Callout
        x={50}
        y={70}
        label="Operator dashboard"
        appearAt={14}
        duration={duration}
        side="right"
      />
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// B5 · Solution — shot with a callout pinning a specific tile
// -----------------------------------------------------------------------------
function SolutionScene({ duration }: { duration: number }) {
  return (
    <AbsoluteFill>
      <DollyIn
        src="screens/02-solution.png"
        duration={duration}
        fromScale={1.02}
        toScale={1.08}
        originX={42}
        originY={50}
      />
      <Callout
        x={32}
        y={50}
        label="Front of house"
        appearAt={16}
        duration={duration}
        side="right"
      />
      <SectionChip
        index={2}
        total={5}
        label="Solution"
        duration={duration}
      />
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// B6 · Features — overlay 4 floating cards that pop in staggered, over a
// blurred shot of the features grid
// -----------------------------------------------------------------------------
function FeatureCard({
  title,
  subtitle,
  delay,
  x,
  y,
}: {
  title: string;
  subtitle: string;
  delay: number;
  x: number;
  y: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { mass: 0.5, damping: 13, stiffness: 150 },
  });
  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) translateY(${(1 - enter) * 24}px) scale(${0.92 + enter * 0.08})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: "20px 26px",
        background: "rgba(252,247,239,0.96)",
        backdropFilter: "blur(12px)",
        borderRadius: 22,
        boxShadow:
          "0 30px 80px -20px rgba(12,12,12,0.35), 0 0 0 1px rgba(162,123,92,0.18)",
        fontFamily,
        minWidth: 340,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: C.primary,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 500,
          color: C.ink,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
    </div>
  );
}

function FeaturesScene({ duration }: { duration: number }) {
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, filter: "blur(1.5px) brightness(0.95)" }}>
        <DollyIn
          src="screens/03-features.png"
          duration={duration}
          fromScale={1.06}
          toScale={1.10}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(252,247,239,0.55) 0%, rgba(252,247,239,0.25) 100%)",
        }}
      />
      <FeatureCard title="Orders fire to the right station" subtitle="Kitchen sync" delay={6} x={28} y={36} />
      <FeatureCard title="Stock deducts as you sell" subtitle="Inventory" delay={14} x={68} y={48} />
      <FeatureCard title="Close the day in three minutes" subtitle="Reports" delay={22} x={32} y={68} />
      <FeatureCard title="One POS, every outlet" subtitle="Multi-location" delay={30} x={72} y={78} />
      <SectionChip
        index={3}
        total={5}
        label="Features"
        appearAt={4}
        duration={duration}
      />
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// B7 · Pricing — glow ring on a plan + chip
// -----------------------------------------------------------------------------
function PricingScene({ duration }: { duration: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse =
    0.5 + 0.5 * Math.sin((frame / fps) * Math.PI * 1.5);
  const glowOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <DollyIn
        src="screens/04-pricing.png"
        duration={duration}
        fromScale={1.02}
        toScale={1.07}
        originX={50}
        originY={58}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "52%",
          transform: "translate(-50%, -50%)",
          width: 340,
          height: 420,
          borderRadius: 28,
          boxShadow: `0 0 0 3px ${C.primary}, 0 0 ${60 + pulse * 40}px ${20 + pulse * 20}px rgba(162,123,92,0.55)`,
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />
      <SectionChip
        index={4}
        total={5}
        label="Pricing"
        appearAt={4}
        duration={duration}
      />
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// B8 · Testimonial — typewriter quote on a cream card
// -----------------------------------------------------------------------------
function TestimonialScene({ duration }: { duration: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fullText = "“Closes the day in three minutes, not three hours.”";
  const chars = Math.floor(
    interpolate(frame, [4, duration - 6], [0, fullText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    }),
  );
  const shown = fullText.slice(0, chars);
  const cursorVisible = Math.floor(frame / 8) % 2 === 0;

  const cardEnter = spring({
    frame,
    fps,
    config: { mass: 0.5, damping: 14, stiffness: 140 },
  });

  return (
    <AbsoluteFill
      style={{
        background: C.cream,
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          padding: "72px 88px",
          background: "white",
          borderRadius: 36,
          boxShadow:
            "0 60px 120px -40px rgba(12,12,12,0.25), 0 0 0 1px rgba(162,123,92,0.12)",
          transform: `scale(${0.94 + cardEnter * 0.06}) translateY(${(1 - cardEnter) * 24}px)`,
          opacity: cardEnter,
        }}
      >
        <div
          style={{
            color: C.primary,
            fontFamily,
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Operator · Multi-outlet cafe
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 68,
            fontWeight: 500,
            color: C.ink,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            minHeight: 220,
          }}
        >
          {shown}
          <span
            style={{
              display: "inline-block",
              width: 4,
              height: 60,
              marginLeft: 6,
              transform: "translateY(8px)",
              background: C.primary,
              opacity: cursorVisible ? 1 : 0,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// B9 · Outro slam — wordmark, URL pill with looping arrow nudge
// -----------------------------------------------------------------------------
function OutroSlam({ duration }: { duration: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wordmark = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 13, stiffness: 130 },
  });

  const pill = spring({
    frame: frame - 14,
    fps,
    config: { mass: 0.5, damping: 14, stiffness: 140 },
  });

  const arrowLoop =
    8 +
    Math.sin(((frame - 22) / fps) * Math.PI * 2) * 8;

  const eyebrowOpacity = interpolate(frame, [28, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_EXPO_OUT,
  });

  const exitFade = interpolate(frame, [duration - 14, duration], [1, 0], {
    extrapolateLeft: "clamp",
    easing: EASE_EXPO_OUT,
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(75% 65% at 50% 45%, ${C.creamDeep} 0%, ${C.cream} 70%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitFade,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            transform: `scale(${0.85 + wordmark * 0.15})`,
            opacity: wordmark,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: 240,
              fontWeight: 500,
              color: C.ink,
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
            }}
          >
            mise
          </span>
          <span
            aria-hidden
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: C.primary,
              marginLeft: 6,
              marginBottom: 22,
            }}
          />
        </div>

        <div
          style={{
            transform: `translateY(${(1 - pill) * 16}px) scale(${0.92 + pill * 0.08})`,
            opacity: pill,
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "18px 32px",
            borderRadius: 999,
            background: C.ink,
            color: C.cream,
            fontFamily,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          mise-pos.vercel.app
          <span
            style={{
              display: "inline-block",
              transform: `translateX(${arrowLoop}px)`,
            }}
          >
            →
          </span>
        </div>

        <div
          style={{
            opacity: eyebrowOpacity,
            fontFamily,
            fontSize: 20,
            color: C.inkMuted,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Designed & Built End-to-End
        </div>
      </div>
    </AbsoluteFill>
  );
}

// -----------------------------------------------------------------------------
// Beat pulse — barely-perceptible tic on every half-second to add rhythm
// -----------------------------------------------------------------------------
function BeatPulse() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beatFrame = frame % (fps * 0.5);
  const flash = interpolate(beatFrame, [0, 3], [0.04, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: "rgba(255,255,255,0.6)",
        opacity: flash,
        pointerEvents: "none",
        mixBlendMode: "soft-light",
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Optional speckle "stars" — tiny particles drifting across cream voids
// -----------------------------------------------------------------------------
function Specks() {
  const frame = useCurrentFrame();
  const dots = Array.from({ length: 24 }).map((_, i) => {
    const seed = random(`speck-${i}`);
    const x = random(`x-${i}`) * 100;
    const driftY = (frame * 0.18 + seed * 100) % 110;
    const opacity =
      0.08 +
      0.12 *
        Math.sin(
          ((frame / 30) * Math.PI * 2 * (0.4 + seed * 0.6)) + i * 0.6,
        );
    const size = 2 + Math.floor(seed * 4);
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${driftY}%`,
          width: size,
          height: size,
          borderRadius: 999,
          background: C.primary,
          opacity,
          pointerEvents: "none",
        }}
      />
    );
  });
  return <>{dots}</>;
}

// -----------------------------------------------------------------------------
// Main composition
// -----------------------------------------------------------------------------
export const MiseReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      <ColorGrade>
        {/* B1 — wordmark slam */}
        <Sequence from={BEAT.brandSlam.from} durationInFrames={BEAT.brandSlam.len} layout="none">
          <Crossfade duration={BEAT.brandSlam.len} in={2} out={14}>
            <BrandSlam />
            <Specks />
          </Crossfade>
        </Sequence>

        {/* B2 — tagline reveal (overlaps slam) */}
        <Sequence from={BEAT.tagline.from} durationInFrames={BEAT.tagline.len} layout="none">
          <Crossfade duration={BEAT.tagline.len} in={10} out={14}>
            <TaglineReveal duration={BEAT.tagline.len} />
          </Crossfade>
        </Sequence>

        {/* Light leak between B2 and B3 */}
        <Sequence from={BEAT.tagline.from + BEAT.tagline.len - 8} durationInFrames={22} layout="none">
          <LightLeakBurst duration={22} hue={32} side="right" />
        </Sequence>

        {/* B3 — hero wide */}
        <Sequence from={BEAT.heroWide.from} durationInFrames={BEAT.heroWide.len} layout="none">
          <Crossfade duration={BEAT.heroWide.len} in={6} out={14}>
            <HeroWide duration={BEAT.heroWide.len} />
          </Crossfade>
        </Sequence>

        {/* Match-cut light leak between B3 and B4 */}
        <Sequence from={BEAT.heroWide.from + BEAT.heroWide.len - 8} durationInFrames={20} layout="none">
          <LightLeakBurst duration={20} hue={28} side="left" />
        </Sequence>

        {/* B4 — hero detail zoom */}
        <Sequence from={BEAT.heroDetail.from} durationInFrames={BEAT.heroDetail.len} layout="none">
          <Crossfade duration={BEAT.heroDetail.len} in={6} out={14}>
            <HeroDetail duration={BEAT.heroDetail.len} />
          </Crossfade>
        </Sequence>

        <Sequence from={BEAT.heroDetail.from + BEAT.heroDetail.len - 8} durationInFrames={20} layout="none">
          <LightLeakBurst duration={20} hue={36} side="top" />
        </Sequence>

        {/* B5 — solution */}
        <Sequence from={BEAT.solution.from} durationInFrames={BEAT.solution.len} layout="none">
          <Crossfade duration={BEAT.solution.len} in={6} out={14}>
            <SolutionScene duration={BEAT.solution.len} />
          </Crossfade>
        </Sequence>

        <Sequence from={BEAT.solution.from + BEAT.solution.len - 8} durationInFrames={20} layout="none">
          <LightLeakBurst duration={20} hue={30} side="right" />
        </Sequence>

        {/* B6 — features */}
        <Sequence from={BEAT.features.from} durationInFrames={BEAT.features.len} layout="none">
          <Crossfade duration={BEAT.features.len} in={6} out={14}>
            <FeaturesScene duration={BEAT.features.len} />
          </Crossfade>
        </Sequence>

        <Sequence from={BEAT.features.from + BEAT.features.len - 8} durationInFrames={20} layout="none">
          <LightLeakBurst duration={20} hue={28} side="left" />
        </Sequence>

        {/* B7 — pricing */}
        <Sequence from={BEAT.pricing.from} durationInFrames={BEAT.pricing.len} layout="none">
          <Crossfade duration={BEAT.pricing.len} in={6} out={14}>
            <PricingScene duration={BEAT.pricing.len} />
          </Crossfade>
        </Sequence>

        <Sequence from={BEAT.pricing.from + BEAT.pricing.len - 8} durationInFrames={20} layout="none">
          <LightLeakBurst duration={20} hue={32} side="right" />
        </Sequence>

        {/* B8 — testimonial typewriter */}
        <Sequence from={BEAT.testimonial.from} durationInFrames={BEAT.testimonial.len} layout="none">
          <Crossfade duration={BEAT.testimonial.len} in={6} out={12}>
            <TestimonialScene duration={BEAT.testimonial.len} />
          </Crossfade>
        </Sequence>

        <Sequence from={BEAT.testimonial.from + BEAT.testimonial.len - 8} durationInFrames={22} layout="none">
          <LightLeakBurst duration={22} hue={34} side="left" />
        </Sequence>

        {/* B9 — outro slam */}
        <Sequence from={BEAT.outro.from} durationInFrames={BEAT.outro.len} layout="none">
          <Crossfade duration={BEAT.outro.len} in={6} out={14}>
            <OutroSlam duration={BEAT.outro.len} />
            <Specks />
          </Crossfade>
        </Sequence>

        {/* Global layers */}
        <BeatPulse />
        <Vignette />
        <Grain />
      </ColorGrade>
    </AbsoluteFill>
  );
};
