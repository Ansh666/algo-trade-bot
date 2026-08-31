import { motion } from "framer-motion";
import { SceneFrame, SceneIndex, SignalDot, Metric, TinyLabel, EASE } from "../SceneKit";

export function Scene4() {
  return (
    <SceneFrame initial={{ clipPath: "inset(100% 0 0 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}>
      <SceneIndex index="04 / 08" label="the guardrail" />
      <div className="absolute left-[8vw] top-[14vh] w-[31vw]">
        <motion.div className="eyebrow flex items-center gap-[.6vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .22, duration: .5 }}><SignalDot color="var(--danger)" /> every entry has an exit plan</motion.div>
        <motion.h2 className="scene-title mt-[2.7vh]" initial={{ opacity: 0, x: "-3vw" }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .38, duration: .8, ease: EASE }}>
          Risk isn&apos;t<br /><span style={{ color: "var(--danger)" }}>an afterthought.</span>
        </motion.h2>
        <motion.p className="mt-[3vh] max-w-[23vw] text-[1.03vw] leading-[1.5] text-[#d7d7ca]/62" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: .6 }}>
          It is wired into the order before the order exists.
        </motion.p>
      </div>
      <motion.div className="glass absolute right-[8vw] top-[15vh] h-[59vh] w-[48vw] p-[1.6vw]" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .5, ease: EASE }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="mono text-[.75vw] tracking-[.11em] text-[#d7d7ca]/68">RELIANCE / NSE · LONG</div>
            <div className="mt-[.8vh] display text-[2vw] tracking-[-.06em]">₹2,842.60 <span className="mono text-[.86vw] text-[#9fdbb5]">+1.14%</span></div>
          </div>
          <div className="outline-chip" style={{ color: "var(--signal)", borderColor: "#9fdbb544" }}>PAPER POSITION</div>
        </div>
        <div className="relative mt-[2vh] h-[29vh] overflow-hidden border-y border-[#d7d7ca]/10">
          <div className="absolute inset-x-0 top-[23%] border-t border-dashed border-[#ef9e3a]/60"><span className="absolute right-0 top-[-1.7vh] mono text-[.62vw] text-[#ef9e3a]">TARGET ₹2,868</span></div>
          <div className="absolute inset-x-0 top-[51%] border-t border-dashed border-[#79b9aa]/60"><span className="absolute right-0 top-[-1.7vh] mono text-[.62vw] text-[#79b9aa]">TRAIL ₹2,839</span></div>
          <div className="absolute inset-x-0 top-[78%] border-t border-dashed border-[#ec7b68]/70"><span className="absolute right-0 top-[-1.7vh] mono text-[.62vw] text-[#ec7b68]">STOP ₹2,826</span></div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 700 220" preserveAspectRatio="none" aria-hidden="true">
            {[0,1,2,3,4,5,6,7,8,9,10,11].map((x) => <line key={x} x1={x * 65} y1="0" x2={x * 65} y2="220" stroke="#d7d7ca" strokeOpacity=".08" />)}
            <motion.path d="M0 176 L55 162 L105 177 L145 145 L188 152 L235 120 L280 133 L326 111 L370 119 L410 88 L455 98 L500 65 L550 76 L600 45 L700 20" fill="none" stroke="#ef9e3a" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: .85, ease: EASE }} />
          </svg>
          <motion.div className="absolute left-[79%] top-[20%] h-[1vw] w-[1vw] rounded-full" style={{ background: "var(--signal)", boxShadow: "0 0 0 .45vw #9fdbb522" }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, duration: .35 }} />
        </div>
        <div className="grid grid-cols-3 gap-[1.2vw] pt-[1.45vw]">
          <Metric value="₹2,826" label="hard stop-loss" accent="var(--danger)" />
          <Metric value="₹2,839" label="trailing stop" accent="var(--teal)" />
          <Metric value="1 : 2.6" label="risk / reward" accent="var(--saffron)" />
        </div>
      </motion.div>
      <motion.div className="absolute bottom-[7vh] left-[8vw] flex items-center gap-[.8vw] micro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.65, duration: .5 }}>
        <SignalDot color="var(--danger)" /> STOP-LOSS SET · TRAIL ACTIVATES IN PROFIT · SIZE IS CAPPED
      </motion.div>
    </SceneFrame>
  );
}