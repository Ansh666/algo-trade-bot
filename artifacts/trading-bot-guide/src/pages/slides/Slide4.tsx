export default function Slide4() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#0F172A] font-display text-white flex flex-col pt-[15vh] px-[8vw] pb-[8vh] box-border">
      {/* Background Dot Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "2vw 2vw",
        }}
      />
      
      {/* Top Header */}
      <div className="absolute top-[4vh] left-[5vw] right-[5vw] flex justify-between items-center z-10">
        <div className="text-[#14B8A6] text-[2.2vw] font-bold tracking-[0.1em] uppercase">
          AI Trading Bot
        </div>
        <div className="text-[#94A3B8] text-[1.5vw] font-body">
          STEP 1
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-[6vh]">
          <div className="text-[#14B8A6] text-[2.4vw] font-bold tracking-[0.15em] uppercase mb-[1vh]">
            Configuration
          </div>
          <h1 className="text-[3.5vw] font-bold m-0 tracking-[-0.02em] leading-[1.1]">
            Step 1 — Set your risk mandate
          </h1>
        </div>

        <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-[2vw]">
          {[
            { title: "Open Settings", desc: "Open Settings before starting a session", stat: "1" },
            { title: "Capital Allocation", desc: "Enter the capital allocated to this strategy", stat: "2" },
            { title: "Risk Parameters", desc: "Set risk per trade and maximum open positions", stat: "3" },
            { title: "Reward to Risk", desc: "Keep minimum reward-to-risk at 1:2 or better", stat: "4" },
            { title: "Daily Limits", desc: "Define a daily loss limit and daily profit cap", stat: "5" },
            { title: "Simulation First", desc: "Leave Live Mode disabled while testing", stat: "6" }
          ].map((item, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-[1vw] p-[3vh_2vw] flex items-center gap-[2vw] backdrop-blur-[10px]">
              <div className="text-[3vw] font-bold text-[#14B8A6]/20 leading-none">
                0{item.stat}
              </div>
              <div className="flex flex-col">
                <div className="text-[2.2vw] text-white font-bold mb-[0.5vh]">{item.title}</div>
                <div className="text-[2vw] text-[#94A3B8] font-body leading-[1.4] text-pretty">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-[4vh] left-[5vw] right-[5vw] flex justify-between items-center z-10 border-t border-white/10 pt-[2vh]">
        <div className="text-[#94A3B8] text-[1.5vw] font-body">
          Presentation Deck
        </div>
        <div className="flex gap-[2vw] items-center">
          <div className="text-[#94A3B8] text-[1.5vw] font-body">
            Confidential
          </div>
          <div className="text-white text-[1.5vw] font-semibold font-body">
            04
          </div>
        </div>
      </div>
    </div>
  );
}
