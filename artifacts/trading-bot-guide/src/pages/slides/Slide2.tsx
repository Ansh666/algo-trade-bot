export default function Slide2() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#0F172A] font-display text-white flex flex-col pt-[15vh] px-[8vw] pb-[8vh] box-border">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "4vw 4vh",
        }}
      />
      
      {/* Top Header */}
      <div className="absolute top-[4vh] left-[5vw] right-[5vw] flex justify-between items-center z-10">
        <div className="text-[#14B8A6] text-[2.2vw] font-bold tracking-[0.1em] uppercase">
          AI Trading Bot
        </div>
        <div className="text-[#94A3B8] text-[1.5vw] font-body">
          OVERVIEW
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-[6vh]">
          <div className="text-[#14B8A6] text-[2.4vw] font-bold tracking-[0.15em] uppercase mb-[1vh]">
            Overview
          </div>
          <h1 className="text-[3.5vw] font-bold m-0 tracking-[-0.02em] leading-[1.1]">
            What this application does
          </h1>
        </div>

        {/* Bullet Points */}
        <div className="flex-1 flex flex-col gap-[3vh] w-full max-w-[80vw]">
          {[
            "Monitors a focused universe of liquid NSE stocks",
            "Organizes analysis through Parent Bot and Child Bot roles",
            "Combines volume, EMA, VWAP, support/resistance, and risk-reward",
            "Tracks signals, positions, orders, trades, and a virtual wallet",
            "Enforces daily guardrails before emotion takes control"
          ].map((bullet, i) => (
            <div key={i} className="flex items-start bg-white/[0.03] border border-white/5 rounded-[1vw] p-[3vh_3vw] backdrop-blur-[10px]">
              <div className="w-[1vw] h-[1vw] mt-[0.8vw] rounded-full bg-[#14B8A6] mr-[2vw] shrink-0" />
              <div className="text-[2.2vw] text-white font-body leading-[1.4] font-medium text-pretty">
                {bullet}
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
            02
          </div>
        </div>
      </div>
    </div>
  );
}
