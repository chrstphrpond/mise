import { Composition } from "remotion";
import { MiseReel, FPS, DURATION_IN_FRAMES, WIDTH, HEIGHT } from "./MiseReel";

export const RemotionRoot = () => {
  return (
    <Composition
      id="MiseReel"
      component={MiseReel}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
