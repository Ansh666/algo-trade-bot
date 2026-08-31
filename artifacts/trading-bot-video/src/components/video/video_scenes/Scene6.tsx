import { motion } from "framer-motion";
import { SceneFrame, SceneIndex, SignalDot, TinyLabel, EASE } from "../SceneKit";

export function Scene6() {
  return (
    <SceneFrame initial={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }} exit={{ clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" }}>
      <SceneIndex index="06 / 08" label="the boundary" />
      <div className="absolute left-[8vw] top-[15vh] w-[31vw]">
        <motion.div className="eyebrow flex items-center gap-[.6vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2, duration: .5 }}><SignalDot color="var(--danger)" /> stay in the game</motion.div>
        <motion.h2 className="scene-title mt-[2.6vh]" initial={{ opacity: 0, x: "-2vw" }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .36, duration: .8, ease: EASE }}>
          The day<br /><span style={{ color: "var(--danger)" }}>has limits.</span>
        </motion.h2>
        <motion.p className="mt-[3vh] max-w-[22vw] text-[1.03vw] leading-[1.5] text-[#d7d7ca]/62" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: .6 }}>
          When the edge is reached, the bot stops. No revenge trades. No exceptions.
        </motion.p>
      </div>
      <motion.div className="absolute right-[9vw] top-[16vh] w-[44vw]" initial={{ opacity: 0, scale: .93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .5, ease: EASE }}>
        <div className="grid grid-cols-2 gap-[1vw]">
          <div className="glass p-[1.5vw]">
            <TinyLabel color="var(--saffron)">LOSS LIMIT</TinyLabel>
            <div className="mt-[1.4vh] mono text-[2.9vw] tracking-[-.07em]">−₹4,800</div>
            <div className="mt-[1.4vw] h-[.55vw] overflow-hidden rounded-full bg-[#d7d7ca]/10"><motion.div className="h-full rounded-full" style={{ background: "var(--saffron)", transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: .38 }} transition={{ duration: 1.2, delay: 1, ease: EASE }} /></div>
            <div className="mt-[.8vw] flex justify-between"><span className="micro">used ₹1,840</span><span className="mono text-[.62vw] text-[#d7d7ca]/45">38%</span></div>
          </div>
          <div className="glass p-[1.5vw]">
            <TinyLabel color="var(--teal)">PROFIT CAP</TinyLabel>
            <div className="mt-[1.4vh] mono text-[2.9vw] tracking-[-.07em]">+₹8,000</div>
            <div className="mt-[1.4vw] h-[.55vw] overflow-hidden rounded-full bg-[#d7d7ca]/10"><motion.div className="h-full rounded-full" style={{ background: "var(--teal)", transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: .33 }} transition={{ duration: 1.2, delay: 1.15, ease: EASE }} /></div>
            <div className="mt-[.8vw] flex justify-between"><span className="micro">booked +₹2,640</span><span className="mono text-[.62vw] text-[#d7d7ca]/45">33%</span></div>
          </div>
        </div>
        <div className="glass mt-[1vw] flex items-center justify-between p-[1.25vw]">
          <div><TinyLabel color="var(--danger)">EMERGENCY STOP</TinyLabel><div className="mt-[.65vw] text-[1.05vw] text-[#d7d7ca]/75">Flatten paper positions, halt new signals</div></div>
          <div className="flex h-[3.1vw] w-[8.6vw] items-center justify-center border border-[#ec7b68]/50 text-[.67vw] tracking-[.15em] text-[#ec7b68]">ARMED <span className="ml-[.7vw] h-[.42vw] w-[.42vw] rounded-full bg-[#ec7b68] blink" /></div>
        </div>
        <div className="mt-[1.3vw] grid grid-cols-3 gap-[1vw]">
          {["MAX 03 POSITIONS", "₹42K ALLOCATED", "1 SESSION / DAY"].map((item, i) => (
            <motion.div key={item} className="border-l border-[#d7d7ca]/20 pl-[.8vw]" initial={{ opacity: 0, y: "1vh" }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55 + i * .12, duration: .45 }}>
              <TinyLabel>{item}</TinyLabel>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div className="absolute bottom-[7vh] left-[8vw] flex items-center gap-[.8vw] micro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.85, duration: .5 }}>
        <SignalDot color="var(--danger)" /> PROTECT CAPITAL FIRST · OPPORTUNITY COMES SECOND
      </motion.div>
    </SceneFrame>
  );
}