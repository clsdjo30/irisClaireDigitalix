// useFlipAnimation.ts
import { useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

const useFlipAnimation = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flip = useSharedValue(0);
  const scale = useSharedValue(1);
  const up = useSharedValue(0);
  const left = useSharedValue(0);

  const flipCard = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      flip.value = withTiming(180, { duration: 1200 });
      scale.value = withTiming(2, { duration: 1200 }, () => {
        scale.value = withTiming(1, { duration: 1200 });
      });
      left.value = withTiming(-30, { duration: 1200 }, () => {
        left.value = withTiming(0, { duration: 1200 });
      });
      up.value = withTiming(-80, { duration: 1200 }, () => {
        up.value = withTiming(0, { duration: 1200 });
      });
    }
  };

  return { isFlipped, flipCard, flip, scale, up, left };
};

export default useFlipAnimation;
