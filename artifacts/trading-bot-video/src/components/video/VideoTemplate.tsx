import { AnimatePresence, motion } from "framer-motion";
import { useVideoPlayer } from "@/lib/video";
import { Scene1 } from "./video_scenes/Scene1";
import { Scene2 } from "./video_scenes/Scene2";
import { Scene3 } from "./video_scenes/Scene3";
import { Scene4 } from "./video_scenes/Scene4";
import { Scene5 } from "./video_scenes/Scene5";
import { Scene6 } from "./video_scenes/Scene6";
import { Scene7 } from "./video_scenes/Scene7";
import { Scene8 } from "./video_scenes/Scene8";

export const SCENE_DURATIONS = {
  opening: 4600,
  architecture: 4200,
  signals: 5200,
  safeguards: 4700,
  ledger: 4300,
  boundaries: 4300,
  runway: 4500,
  close: 5000,
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({ durations: SCENE_DURATIONS });
  const progress = ((currentScene + 1) / Object.keys(SCENE_DURATIONS).length) * 100;

  return (
    <main className="video-root">
      <motion.div
        className="absolute left-0 top-0 z-20 h-[.32vh] bg-[#ef9e3a]"
        style={{ width: "100%", transformOrigin: "left center" }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div className="absolute left-[4vw] top-[5.5vh] z-20 flex items-center gap-[.7vw]" animate={{ x: currentScene === 6 ? "1vw" : 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
        <div className="flex h-[2.1vw] w-[2.1vw] items-center justify-center border border-[#ef9e3a]/70 text-[.76vw] text-[#ef9e3a]">AI</div>
        <div className="mono text-[.72vw] tracking-[.13em] text-[#d7d7ca]/64">TRADING BOT</div>
      </motion.div>
      <motion.div className="pointer-events-none absolute -right-[11vw] top-[18vh] z-[1] h-[35vw] w-[35vw] rounded-full bg-[#ef9e3a]/[.04] blur-[2px]" animate={{ x: currentScene % 2 ? "-4vw" : "3vw", y: currentScene === 3 ? "5vh" : 0, scale: currentScene === 7 ? 1.2 : 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
      <motion.div className="pointer-events-none absolute -bottom-[18vw] left-[32vw] z-[1] h-[43vw] w-[43vw] rounded-full bg-[#79b9aa]/[.035] blur-[2px]" animate={{ x: currentScene % 2 ? "2vw" : "-3vw", scale: currentScene === 1 ? 1.18 : 1 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} />
      <div className="absolute bottom-[3.8vh] right-[4vw] z-20 mono text-[.58vw] tracking-[.12em] text-[#d7d7ca]/28">NSE // 5M // 2025.04.18 // SIMULATION</div>
      <AnimatePresence mode="sync" initial={false}>
        {currentScene === 0 && <Scene1 key="opening" />}
        {currentScene === 1 && <Scene2 key="architecture" />}
        {currentScene === 2 && <Scene3 key="signals" />}
        {currentScene === 3 && <Scene4 key="safeguards" />}
        {currentScene === 4 && <Scene5 key="ledger" />}
        {currentScene === 5 && <Scene6 key="boundaries" />}
        {currentScene === 6 && <Scene7 key="runway" />}
        {currentScene === 7 && <Scene8 key="close" />}
      </AnimatePresence>
    </main>
  );
}