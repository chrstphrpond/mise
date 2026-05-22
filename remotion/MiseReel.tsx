import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/DMSans";

const { fontFamily } = loadFont();

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

const INTRO_FRAMES = 75;
const SCENE_FRAMES = 100;
const SHORT_SCENE_FRAMES = 90;
const OUTRO_FRAMES = 100;
const TRANSITION_FRAMES = 20;

// Five transitions × 20 = 100 shortened from the cumulative scene length.
// 75 + 100 + 90 + 90 + 90 + 100 - 100 = 445 ≈ 14.8s
export const DURATION_IN_FRAMES =
  INTRO_FRAMES +
  SCENE_FRAMES +
  SHORT_SCENE_FRAMES * 3 +
  OUTRO_FRAMES -
  TRANSITION_FRAMES * 5;

// Brand palette pulled from src/app/globals.css.
const COLORS = {
  cream: "#fcf7ef",
  creamDeep: "#fef2db",
  primary: "#a27b5c",
  primaryDeep: "#6c523d",
  ink: "#0c0c0c",
  inkMuted: "#5b574f",
};

const EASE_OUT_EXPO = Easing.bezier(0.16, 1, 0.3, 1);

function KenBurns({
  src,
  durationInFrames,
  from = 1,
  to = 1.08,
  originX = 50,
  originY = 50,
}: {
  src: string;
  durationInFrames: number;
  from?: number;
  to?: number;
  originX?: number;
  originY?: number;
}) {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 0.61, 0.36, 1),
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: COLORS.cream }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          transform: `scale(${scale})`,
          transformOrigin: `${originX}% ${originY}%`,
        }}
      />
    </AbsoluteFill>
  );
}

function SceneLabel({
  index,
  total,
  label,
  durationInFrames,
}: {
  index: number;
  total: number;
  label: string;
  durationInFrames: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  const exit = interpolate(
    frame,
    [durationInFrames - fps * 0.4, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", easing: EASE_OUT_EXPO },
  );

  const opacity = enter * exit;
  const y = (1 - enter) * 24;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: 72,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${y}px)`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 24px",
          borderRadius: 999,
          background: "rgba(252,247,239,0.92)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 20px 60px -30px rgba(12,12,12,0.35)",
          fontFamily,
          fontSize: 28,
          fontWeight: 500,
          color: COLORS.ink,
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{ color: COLORS.primary, fontVariantNumeric: "tabular-nums" }}>
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          style={{
            width: 1,
            height: 22,
            background: "rgba(12,12,12,0.18)",
          }}
        />
        <span>{label}</span>
      </div>
    </AbsoluteFill>
  );
}

function ScreenScene({
  src,
  index,
  total,
  label,
  durationInFrames,
  originX = 50,
  originY = 50,
}: {
  src: string;
  index: number;
  total: number;
  label: string;
  durationInFrames: number;
  originX?: number;
  originY?: number;
}) {
  return (
    <AbsoluteFill>
      <KenBurns
        src={src}
        durationInFrames={durationInFrames}
        originX={originX}
        originY={originY}
      />
      <SceneLabel
        index={index}
        total={total}
        label={label}
        durationInFrames={durationInFrames}
      />
    </AbsoluteFill>
  );
}

function BlurReveal({
  text,
  delay = 0,
  size,
  color,
  weight = 500,
  letterSpacing = "-0.03em",
}: {
  text: string;
  delay?: number;
  size: number;
  color: string;
  weight?: number;
  letterSpacing?: string;
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const chars = Array.from(text);

  return (
    <div
      style={{
        fontFamily,
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing,
        lineHeight: 1.05,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {chars.map((ch, i) => {
        const charStart = delay + i * 0.025 * fps;
        const localFrame = frame - charStart;
        const progress = interpolate(localFrame, [0, fps * 0.4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_OUT_EXPO,
        });
        const opacity = progress;
        const y = (1 - progress) * 20;
        const blur = (1 - progress) * 10;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${y}px)`,
              filter: `blur(${blur}px)`,
              whiteSpace: "pre",
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
}

function IntroCard() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  const lineWidth = interpolate(frame, [fps * 0.3, fps * 1.1], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(60% 50% at 50% 35%, ${COLORS.creamDeep} 0%, ${COLORS.cream} 70%)`,
        justifyContent: "center",
        alignItems: "center",
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
            gap: 12,
            padding: "10px 20px",
            borderRadius: 999,
            background: "rgba(162,123,92,0.12)",
            color: COLORS.primaryDeep,
            fontFamily,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: COLORS.primary,
            }}
          />
          Portfolio · Mise
        </div>

        <BlurReveal
          text="Smarter F&B Operations"
          delay={fps * 0.2}
          size={108}
          color={COLORS.ink}
        />
        <div style={{ marginTop: -8 }}>
          <BlurReveal
            text="with Modern POS"
            delay={fps * 0.7}
            size={108}
            color={COLORS.primary}
          />
        </div>

        <div
          style={{
            marginTop: 18,
            width: lineWidth,
            height: 3,
            background: COLORS.primary,
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

function OutroCard() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  const arrowX = interpolate(frame, [fps * 0.6, fps * 1.6], [0, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(70% 60% at 50% 45%, ${COLORS.creamDeep} 0%, ${COLORS.cream} 70%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          opacity,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 220,
            fontWeight: 500,
            color: COLORS.ink,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          mise<span style={{ color: COLORS.primary }}>.</span>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 28px",
            borderRadius: 999,
            background: COLORS.ink,
            color: COLORS.cream,
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
              transform: `translateX(${arrowX}px)`,
            }}
          >
            →
          </span>
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 20,
            color: COLORS.inkMuted,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Designed & built end-to-end
        </div>
      </div>
    </AbsoluteFill>
  );
}

const SCENES: Array<{
  src: string;
  label: string;
  duration: number;
  originX?: number;
  originY?: number;
}> = [
  { src: "screens/01-hero.png", label: "Hero · landing", duration: SCENE_FRAMES, originX: 50, originY: 40 },
  { src: "screens/02-solution.png", label: "Solution", duration: SHORT_SCENE_FRAMES, originX: 50, originY: 50 },
  { src: "screens/03-features.png", label: "Features", duration: SHORT_SCENE_FRAMES, originX: 50, originY: 50 },
  { src: "screens/04-pricing.png", label: "Pricing", duration: SHORT_SCENE_FRAMES, originX: 50, originY: 50 },
];

// TransitionSeries iterates its direct children to pair Transitions with
// adjacent Sequences. React fragments break that pairing, so children must be
// inlined as a flat array rather than wrapped in a helper component.
function buildTransitionChildren() {
  const transition = (key: string) => (
    <TransitionSeries.Transition
      key={`t-${key}`}
      presentation={fade()}
      timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
    />
  );

  const children: React.ReactNode[] = [
    <TransitionSeries.Sequence
      key="intro"
      durationInFrames={INTRO_FRAMES}
    >
      <IntroCard />
    </TransitionSeries.Sequence>,
  ];

  SCENES.forEach((scene, i) => {
    children.push(transition(scene.src));
    children.push(
      <TransitionSeries.Sequence
        key={scene.src}
        durationInFrames={scene.duration}
      >
        <ScreenScene
          src={scene.src}
          index={i + 1}
          total={SCENES.length}
          label={scene.label}
          durationInFrames={scene.duration}
          originX={scene.originX}
          originY={scene.originY}
        />
      </TransitionSeries.Sequence>,
    );
  });

  children.push(transition("outro"));
  children.push(
    <TransitionSeries.Sequence key="outro" durationInFrames={OUTRO_FRAMES}>
      <OutroCard />
    </TransitionSeries.Sequence>,
  );

  return children;
}

export const MiseReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.cream }}>
      <TransitionSeries>{buildTransitionChildren()}</TransitionSeries>
    </AbsoluteFill>
  );
};
