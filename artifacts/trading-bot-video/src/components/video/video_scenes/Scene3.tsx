import { motion } from "framer-motion";
import { SceneFrame, SceneIndex, SignalDot, TinyLabel, EASE, asset } from "../SceneKit";

const signals = [
  { label: "VOLUME", value: "2.4×", note: "above 20-bar avg", color: "var(--saffron)" },
  { label: "EMA", value: "20 > 50", note: "trend aligned", color: "var(--teal)" },
  { label: "VWAP", value: "+0.8%", note: "price accepted", color: "var(--signal)" },
  { label: "R:R", value: "1 : 2.6", note: "room to run", color: "var(--copper)" },
];

export function Scene3() {
  return (
    <SceneFrame initial={{ clipPath: "inset(0 50% 0 50%)" }} exit={{ clipPath: "inset(0 0 0 100%)" }}>
      <motion.img className="asset-image left-[-10vw] top-[-10vh] h-[120vh] w-[70vw] opacity-[.3]" src={asset("bg-texture.jpg")} alt="" initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: .3 }} transition={{ duration: 1.5, ease: EASE }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d151a] via-[#0d151a]/80 to-transparent" />
      <SceneIndex index="03 / 08" label="signal stack" />
      <div className="absolute left-[8vw] top-[14vh] w-[34vw]">
        <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .22, duration: .45 }}>confluence engine / live read</motion.div>
        <motion.h2 className="scene-title mt-[2.4vh]" initial={{ opacity: 0, y: "2vh" }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .8, ease: EASE }}>
          No single<br /><span style={{ color: "var(--saffron)" }}>magic number.</span>
        </motion.h2>
        <motion.p className="mt-[3vh] max-w-[23vw] text-[1.03vw] leading-[1.5] text-[#d7d7ca]/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .95, duration: .6 }}>
          The bot waits for the chart to agree with itself.
        </motion.p>
      </div>
      <motion.div className="glass absolute right-[7vw] top-[16vh] w-[43vw] p-[1.45vw]" initial={{ x: "8vw", opacity: 0, rotateY: -8 }} animate={{ x: 0, opacity: 1, rotateY: 0 }} transition={{ duration: 1, delay: .55, ease: EASE }}>
        <div className="flex items-center justify-between border-b border-[#d7d7ca]/10 pb-[1vw]">
          <div className="mono text-[.7vw] tracking-[.12em] text-[#d7d7ca]/65">NIFTY 50 / 5 MIN / LONG BIAS</div>
          <div className="eyebrow flex items-center gap-[.5vw]" style={{ color: "var(--signal)" }}><SignalDot color="var(--signal)" /> 78 / 100</div>
        </div>
        <svg className="mt-[1.1vw] h-[15vw] w-full" viewBox="0 0 700 235" preserveAspectRatio="none" aria-hidden="true">
          {[40, 90, 140, 190].map((y) => <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#d7d7ca" strokeOpacity=".1" />)}
          <motion.path d="M0 182 C55 160 72 172 115 137 S180 158 230 120 S290 92 335 123 S400 102 448 82 S515 118 555 66 S625 80 700 25" fill="none" stroke="#ef9e3a" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: .95, ease: EASE }} />
          <motion.path d="M0 196 C90 184 150 180 235 152 S400 145 500 118 S620 98 700 78" fill="none" stroke="#79b9aa" strokeOpacity=".8" strokeWidth="2" strokeDasharray="7 9" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 1.15, ease: EASE }} />
          <motion.circle cx="555" cy="66" r="6" fill="#9fdbb5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.1, duration: .3 }} />
        </svg>
        <div className="grid grid-cols-4 gap-[.7vw] border-t border-[#d7d7ca]/10 pt-[1vw]">
          {signals.map((signal, i) => (
            <motion.div key={signal.label} initial={{ opacity: 0, y: "1vh" }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 + i * .12, duration: .45, ease: EASE }}>
              <TinyLabel color={signal.color}>{signal.label}</TinyLabel>
              <div className="mono mt-[.75vh] text-[1.17vw]" style={{ color: signal.color }}>{signal.value}</div>
              <div className="micro mt-[.55vh] text-[.57vw]">{signal.note}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div className="absolute bottom-[7vh] left-[8vw] flex items-center gap-[.8vw] micro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: .5 }}>
        <SignalDot color="var(--signal)" /> SUPPORT / RESISTANCE · EMA · VWAP · VOLUME · RISK-REWARD
      </motion.div>
    </SceneFrame>
  );
}