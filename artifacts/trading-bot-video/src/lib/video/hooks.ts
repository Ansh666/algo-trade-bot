import { useEffect, useState } from "react";

type VideoWindow = Window & {
  startRecording?: () => void;
  stopRecording?: () => void;
};

export function useVideoPlayer({ durations }: { durations: Record<string, number> }) {
  const keys = Object.keys(durations);
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    if (keys.length === 0) return;
    const total = keys.reduce((sum, key) => sum + durations[key], 0);
    const starts = keys.map((_, index) =>
      keys.slice(0, index).reduce((sum, key) => sum + durations[key], 0),
    );
    const videoWindow = window as VideoWindow;
    const startedAt = performance.now();
    let frame = 0;
    let stopped = false;
    videoWindow.startRecording?.();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      if (!stopped && elapsed >= total) {
        videoWindow.stopRecording?.();
        stopped = true;
      }
      const cycle = elapsed % total;
      let index = starts.length - 1;
      for (let i = 0; i < starts.length; i += 1) {
        if (cycle >= starts[i] && cycle < starts[i] + durations[keys[i]]) {
          index = i;
          break;
        }
      }
      setCurrentScene(index);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durations, keys]);

  return { currentScene, currentSceneKey: keys[currentScene] };
}