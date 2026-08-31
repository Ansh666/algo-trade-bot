import { motion } from "framer-motion";
import { SceneFrame, SceneIndex, SignalDot, Metric, TinyLabel, EASE } from "../SceneKit";

const rows = [
  ["09:18:04", "BUY · RELIANCE", "−₹28,426", "MARGIN"],
  ["10:42:11", "TRAIL ADJUST", "₹+116", "RISK BOT"],
  ["11:06:32", "SELL · TATASTEEL", "₹+842", "EXIT"],
  ["11:06:33", "REALIZED P&L", "₹+842", "LEDGER"],
];

export function Scene5() {
  return (
    <SceneFrame initial={{ clipPath: "inset(0 0 0 100%)" }} exit={{ clipPath: "inset(0 100% 0 0)" }}>
      <SceneIndex index="05 / 08" label="the ledger" />
      <div className="absolute left-[8vw] top-[15vh]">
        <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2, duration: .5 }}>paper money / real discipline</motion.div>
        <motion.h2 className="scene-title mt-[2.5vh]" initial={{ opacity: 0, y: "2vh" }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .36, duration: .8, ease: EASE }}>
          Every rupee<br /><span style={{ color: "var(--saffron)" }}>leaves a trace.</span>
        </motion.h2>
      </div>
      <motion.div className="glass absolute right-[8vw] top-[17vh] w-[48vw] p-[1.7vw]" initial={{ opacity: 0, y: "4vh" }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .55, ease: EASE }}>
        <div className="flex items-end justify-between border-b border-[#d7d7ca]/10 pb-[1.5vw]">
          <div>
            <TinyLabel color="var(--teal)">VIRTUAL WALLET / INTRADAY</TinyLabel>
            <div className="mt-[.7vh] display text-[3.6vw] tracking-[-.08em]">₹1,84,520</div>
          </div>
          <div className="text-right">
            <TinyLabel>DAILY P&L</TinyLabel>
            <div className="mono mt-[.7vh] text-[1.25vw] text-[#9fdbb5]">+₹2,640.40</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[1vw] py-[1.4vw]">
          <Metric value="₹42,640" label="allocated today" accent="var(--paper)" />
          <Metric value="₹28,426" label="margin in use" accent="var(--teal)" />
          <Metric value="₹14,214" label="available" accent="var(--saffron)" />
        </div>
        <div className="border-t border-[#d7d7ca]/10 pt-[1vw]">
          <div className="mb-[.85vw] flex justify-between"><TinyLabel>ACTIVITY LOG</TinyLabel><TinyLabel color="var(--teal)">AUTO-JOURNALED</TinyLabel></div>
          <div className="space-y-[.72vw]">
            {rows.map((row, i) => (
              <motion.div key={row[0]} className="grid grid-cols-[6.8vw_1fr_6.3vw_5vw] items-center gap-[.6vw] border-b border-[#d7d7ca]/[.06] pb-[.65vw]" initial={{ opacity: 0, x: "1vw" }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 + i * .15, duration: .42, ease: EASE }}>
                <span className="mono text-[.62vw] text-[#d7d7ca]/42">{row[0]}</span>
                <span className="mono text-[.66vw] text-[#d7d7ca]/77">{row[1]}</span>
                <span className="mono text-[.66vw] text-[#9fdbb5]">{row[2]}</span>
                <span className="text-right text-[.57vw] tracking-[.08em] text-[#d7d7ca]/42">{row[3]}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div className="absolute bottom-[7vh] left-[8vw] flex items-center gap-[.8vw] micro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: .5 }}>
        <SignalDot color="var(--teal)" /> NO BROKER ACCOUNT REQUIRED · NO HIDDEN EXPOSURE
      </motion.div>
    </SceneFrame>
  );
}