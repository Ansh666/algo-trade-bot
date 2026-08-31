import { motion } from "framer-motion";
import { SceneFrame, SceneIndex, SignalDot, Metric, asset, EASE } from "../SceneKit";

export function Scene1() {
  return (
    <SceneFrame initial={{ clipPath: "inset(0 0 0 100%)" }} exit={{ clipPath: "inset(0 100% 0 0)" }}>
      <motion.img
        className="asset-image right-[-8vw] top-[-12vh] h-[118vh] w-[66vw] opacity-[.42]"
        src={asset("bg-trading.jpg")}
        alt=""
        initial={{ scale: 1.16, x: "5vw", opacity: 0 }}
        animate={{ scale: 1, x: 0, opacity: 0.42 }}
        transition={{ duration: 1.8, ease: EASE }}
      />
      <div className="absolute inset-y-0 right-0 w-[58vw] bg-gradient-to-l from-[#0d151a]/10 to-transparent" />
      <SceneIndex index="01 / 08" label="opening bell" />
      <div className="absolute left-[8vw] top-[16vh] w-[54vw]">
        <motion.div
          className="eyebrow flex items-center gap-[.8vw]"
          initial={{ opacity: 0, x: "-2vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
        >
          <SignalDot /> 09:15 IST / NSE / PAPER MODE
        </motion.div>
        <motion.div
          className="rule-saffron mt-[3.4vh] w-[13vw]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
        />
        <h1 className="scene-title mt-[3.2vh] max-w-[52vw]">
          <motion.span className="block" initial={{ y: "105%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.48, ease: EASE }}>
            A clearer
          </motion.span>
          <motion.span className="block" style={{ color: "var(--saffron)" }} initial={{ y: "105%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.82, delay: 0.6, ease: EASE }}>
            way to trade.
          </motion.span>
        </h1>
        <motion.p
          className="mt-[3.2vh] max-w-[26vw] text-[1.12vw] leading-[1.45] text-[#d7d7ca]/65"
          initial={{ opacity: 0, y: "1.5vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 1.02, ease: EASE }}
        >
          A personal AI-powered intraday control center for India&apos;s NSE market.
        </motion.p>
      </div>
      <motion.div
        className="glass absolute bottom-[10vh] right-[9vw] w-[31vw] p-[1.5vw]"
        initial={{ y: "8vh", opacity: 0, rotate: 2 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.95, delay: 1.25, ease: EASE }}
      >
        <div className="flex items-center justify-between border-b border-[#d7d7ca]/10 pb-[1.1vw]">
          <div className="mono text-[.73vw] tracking-[.11em] text-[#d7d7ca]/75">MISSION CONTROL / 01</div>
          <div className="flex items-center gap-[.55vw] eyebrow" style={{ color: "var(--signal)" }}><SignalDot color="var(--signal)" /> ONLINE</div>
        </div>
        <div className="grid grid-cols-3 gap-[1vw] py-[1.4vw]">
          <Metric value="₹1.84L" label="virtual wallet" accent="var(--paper)" />
          <Metric value="+₹2,640" label="today&apos;s P&L" accent="var(--signal)" />
          <Metric value="03" label="active positions" accent="var(--saffron)" />
        </div>
        <div className="flex items-center justify-between border-t border-[#d7d7ca]/10 pt-[1vw]">
          <span className="micro">seeded market stream</span>
          <span className="mono text-[.65vw] text-[#d7d7ca]/45">WAITING FOR LIVE LINK</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-[5.3vh] left-[8vw] micro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        BUILT FOR FOCUS / NOT FOR FOMO
      </motion.div>
    </SceneFrame>
  );
}