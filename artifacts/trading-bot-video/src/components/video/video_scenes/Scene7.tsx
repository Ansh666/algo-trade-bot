import { motion } from "framer-motion";
import { SceneFrame, SceneIndex, SignalDot, TinyLabel, EASE } from "../SceneKit";

export function Scene7() {
  return (
    <SceneFrame initial={{ clipPath: "inset(0 50% 0 50%)" }} exit={{ clipPath: "inset(0 50% 0 50%)" }}>
      <SceneIndex index="07 / 08" label="the runway" />
      <motion.div className="absolute left-0 top-0 h-full w-1/2 bg-[#e7e4d9] text-[#0d151a]" initial={{ x: "-50vw" }} animate={{ x: 0 }} transition={{ duration: .9, ease: EASE }} />
      <motion.div className="absolute right-0 top-0 h-full w-1/2 bg-[#132329]" initial={{ x: "50vw" }} animate={{ x: 0 }} transition={{ duration: .9, ease: EASE }} />
      <div className="absolute left-[8vw] top-[14vh] w-[35vw] text-[#0d151a]">
        <motion.div className="eyebrow" style={{ color: "var(--copper)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4, duration: .5 }}>right now</motion.div>
        <motion.h2 className="mt-[2.5vh] text-[5.2vw] leading-[.98] tracking-[-.07em]" initial={{ opacity: 0, y: "2vh" }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55, duration: .8, ease: EASE }}>Paper<br /><span style={{ color: "var(--copper)" }}>first.</span></motion.h2>
        <motion.p className="mt-[3vh] max-w-[22vw] text-[1.03vw] leading-[1.5] text-[#0d151a]/62" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: .6 }}>Seeded market data. Virtual wallet. Safe to observe, tune and learn.</motion.p>
        <motion.div className="mt-[3.5vh] flex items-center gap-[.65vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: .4 }}><SignalDot color="var(--copper)" /><TinyLabel color="var(--copper)">LIVE EXECUTION NOT CONNECTED</TinyLabel></motion.div>
      </div>
      <div className="absolute left-1/2 top-1/2 h-[45vh] w-px -translate-x-1/2 -translate-y-1/2 bg-[#d7d7ca]/20" />
      <div className="absolute right-[8vw] top-[14vh] w-[35vw]">
        <motion.div className="eyebrow" style={{ color: "var(--teal)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6, duration: .5 }}>on the horizon</motion.div>
        <motion.h2 className="mt-[2.5vh] text-[5.2vw] leading-[.98] tracking-[-.07em]" initial={{ opacity: 0, y: "2vh" }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72, duration: .8, ease: EASE }}>Upstox<br /><span style={{ color: "var(--teal)" }}>next.</span></motion.h2>
        <motion.p className="mt-[3vh] max-w-[22vw] text-[1.03vw] leading-[1.5] text-[#d7d7ca]/62" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.18, duration: .6 }}>A broker connection is planned for a future release. Until then, the control center stays deliberately simulated.</motion.p>
        <motion.div className="mt-[3.5vh] flex items-center gap-[.65vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.42, duration: .4 }}><SignalDot color="var(--teal)" /><TinyLabel color="var(--teal)">CONNECTION PLANNED · NOT LIVE</TinyLabel></motion.div>
      </div>
      <motion.div className="absolute bottom-[7vh] left-[8vw] right-[8vw] flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: .5 }}>
        <span className="mono text-[.67vw] tracking-[.15em] text-[#0d151a]/45">01 / PAPER MODE</span>
        <div className="h-px flex-1 mx-[1.5vw] bg-[#0d151a]/20" />
        <span className="mono text-[.67vw] tracking-[.15em] text-[#d7d7ca]/45">02 / BROKER LINK PENDING</span>
      </motion.div>
    </SceneFrame>
  );
}