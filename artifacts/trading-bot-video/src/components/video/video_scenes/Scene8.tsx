import { motion } from "framer-motion";
import { SceneFrame, SceneIndex, SignalDot, EASE, asset } from "../SceneKit";

export function Scene8() {
  return (
    <SceneFrame initial={{ clipPath: "circle(0% at 14% 86%)" }} exit={{ clipPath: "circle(0% at 86% 14%)" }}>
      <motion.div className="absolute left-[-12vw] top-[-28vh] h-[78vw] w-[78vw] rounded-full border border-[#ef9e3a]/20" initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.1, delay: .2, ease: EASE }} />
      <motion.div className="absolute left-[-7vw] top-[-16vh] h-[54vw] w-[54vw] rounded-full border border-[#79b9aa]/14" initial={{ scale: .7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, delay: .35, ease: EASE }} />
      <motion.img className="asset-image right-[-2vw] top-[5vh] h-[90vh] w-[45vw] opacity-[.25] object-cover" style={{ mixBlendMode: 'screen', maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)' }} src={asset("bg-ai.jpg")} alt="" initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: .25 }} transition={{ duration: 1.5, delay: .5, ease: EASE }} />
      <SceneIndex index="08 / 08" label="the close" />
      <div className="absolute left-[9vw] top-[21vh]">
        <motion.div className="eyebrow flex items-center gap-[.7vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25, duration: .5 }}><SignalDot /> AI TRADING BOT / MISSION CONTROL</motion.div>
        <motion.h2 className="mt-[3vh] max-w-[65vw] text-[8.6vw] leading-[.88] tracking-[-.095em]" initial={{ opacity: 0, y: "3vh", scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.05, delay: .45, ease: EASE }}>
          Trade with a<br /><span style={{ color: "var(--saffron)" }}>plan.</span>
        </motion.h2>
        <motion.div className="mt-[4vh] flex items-center gap-[1vw]" initial={{ opacity: 0, x: "-2vw" }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3, duration: .65, ease: EASE }}>
          <div className="h-[2px] w-[7vw]" style={{ background: "var(--saffron)" }} />
          <span className="text-[1.1vw] text-[#d7d7ca]/65">Not a promise of profit. A better way to stay in control.</span>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-[9vh] left-[9vw] right-[9vw] flex items-end justify-between border-t border-[#d7d7ca]/14 pt-[1.4vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.65, duration: .55 }}>
        <div className="flex items-center gap-[.7vw]"><SignalDot color="var(--signal)" /><span className="eyebrow" style={{ color: "var(--signal)" }}>PAPER MODE / SEE IT THINK</span></div>
        <div className="text-right">
          <div className="mono text-[.65vw] tracking-[.13em] text-[#d7d7ca]/42">MADE FOR INDIA&apos;S NSE MARKET</div>
          <div className="mt-[.6vh] text-[.8vw] text-[#d7d7ca]/58">A calm cockpit for noisy days.</div>
        </div>
      </motion.div>
    </SceneFrame>
  );
}