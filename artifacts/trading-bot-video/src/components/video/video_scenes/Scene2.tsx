import { motion } from "framer-motion";
import { SceneFrame, SceneIndex, SignalDot, TinyLabel, EASE } from "../SceneKit";

const bots = [
  { name: "SIGNAL", sub: "scans confluence", x: "12vw", y: "18vh", color: "var(--teal)" },
  { name: "EXECUTION", sub: "paper orders", x: "12vw", y: "64vh", color: "var(--saffron)" },
  { name: "RISK", sub: "guards downside", x: "71vw", y: "18vh", color: "var(--danger)" },
  { name: "JOURNAL", sub: "logs every move", x: "71vw", y: "64vh", color: "var(--signal)" },
];

export function Scene2() {
  return (
    <SceneFrame initial={{ clipPath: "circle(0% at 50% 50%)" }} exit={{ clipPath: "circle(0% at 50% 50%)" }}>
      <SceneIndex index="02 / 08" label="the architecture" />
      <div className="absolute left-[8vw] top-[13vh]">
        <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2, duration: .5 }}>01 parent / 04 children</motion.div>
        <motion.h2 className="scene-title mt-[2.5vh] max-w-[42vw]" initial={{ opacity: 0, y: "2vh" }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .8, ease: EASE }}>
          One mind.<br /><span style={{ color: "var(--teal)" }}>Many eyes.</span>
        </motion.h2>
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <motion.path d="M800 455 C620 360 420 290 230 228 M800 455 C620 530 420 625 230 674 M800 455 C980 360 1180 290 1370 228 M800 455 C980 530 1180 625 1370 674" stroke="#79b9aa" strokeOpacity=".45" strokeWidth="2" fill="none" strokeDasharray="8 14" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: .55, ease: EASE }} />
        <motion.circle cx="800" cy="455" r="128" fill="none" stroke="#ef9e3a" strokeOpacity=".16" strokeWidth="1" strokeDasharray="4 12" initial={{ scale: .4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.1, delay: .35, ease: EASE }} />
      </svg>
      <motion.div
        className="glass absolute left-1/2 top-[50%] flex h-[13vw] w-[13vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full"
        initial={{ scale: .5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: .9, delay: .6, ease: EASE }}
      >
        <div className="eyebrow flex items-center gap-[.6vw]" style={{ color: "var(--saffron)" }}><SignalDot /> PARENT BOT</div>
        <div className="display mt-[1.3vh] text-[2vw] tracking-[-.06em]">ORCHESTRATOR</div>
        <div className="micro mt-[1vh]">makes the call</div>
      </motion.div>
      {bots.map((bot, i) => (
        <motion.div
          key={bot.name}
          className="glass absolute w-[16vw] p-[1.1vw]"
          style={{ left: bot.x, top: bot.y }}
          initial={{ opacity: 0, scale: .82, y: i % 2 ? "1.5vh" : "-1.5vh" }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: .72, delay: .85 + i * .14, ease: EASE }}
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow" style={{ color: bot.color }}>{bot.name}</span>
            <SignalDot color={bot.color} />
          </div>
          <div className="mt-[1.25vh] text-[.94vw] text-[#d7d7ca]/74">{bot.sub}</div>
          <div className="mt-[1.3vh] flex gap-[.35vw]">
            {[0, 1, 2, 3, 4].map((bar) => (
              <motion.div key={bar} className="h-[.28vw] flex-1" style={{ background: bot.color, opacity: .35 + bar * .12, transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .35, delay: 1.2 + i * .12 + bar * .06 }} />
            ))}
          </div>
        </motion.div>
      ))}
      <motion.div className="absolute bottom-[7vh] left-[8vw] flex items-center gap-[1vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.75, duration: .6 }}>
        <TinyLabel color="var(--teal)">SPECIALISTS STAY IN THEIR LANE</TinyLabel>
        <div className="h-px w-[12vw]" style={{ background: "var(--teal)", opacity: .5 }} />
        <TinyLabel>THE PARENT KEEPS THE CONTEXT</TinyLabel>
      </motion.div>
    </SceneFrame>
  );
}