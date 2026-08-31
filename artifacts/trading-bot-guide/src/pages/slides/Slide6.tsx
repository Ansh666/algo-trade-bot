export default function Slide6() {
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
          STEP 3
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-[6vh]">
          <div className="text-[#14B8A6] text-[2.4vw] font-bold tracking-[0.15em] uppercase mb-[1vh]">
            Dashboard
          </div>
          <h1 className="text-[3.5vw] font-bold m-0 tracking-[-0.02em] leading-[1.1]">
            Step 3 — Read Mission Control
          </h1>
        </div>

        {/* 3 Column Layout */}
        <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-[2vw]">
          {[
            { title: "Session", desc: "Shows the current operating state" },
            { title: "Today’s P&L", desc: "Compares results with daily limits" },
            { title: "Active Activity", desc: "Counts positions and pending signals" },
            { title: "Performance", desc: "Separates wins from losses" },
            { title: "Top Live Signals", desc: "Prioritizes current opportunities" },
            { title: "Recent Trades", desc: "Reveals what the system just completed" }
          ].map((item, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-[1vw] p-[3vh_2vw] flex flex-col justify-center backdrop-blur-[10px] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[0.4vh] bg-[#14B8A6] opacity-80" />
              <div className="text-[2.2vw] font-bold text-white mb-[1vh]">{item.title}</div>
              <div className="text-[2vw] text-[#94A3B8] font-body leading-[1.4] text-pretty">
                {item.desc}
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
            06
          </div>
        </div>
      </div>
    </div>
  );
}
