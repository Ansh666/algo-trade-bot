export default function Slide11() {
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
          DISCIPLINE
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-[6vh] text-center flex flex-col items-center">
          <div className="text-[#14B8A6] text-[2.4vw] font-bold tracking-[0.15em] uppercase mb-[1vh]">
            Best Practices
          </div>
          <h1 className="text-[3.5vw] font-bold m-0 tracking-[-0.02em] leading-[1.1]">
            Practical habits that can improve outcomes
          </h1>
        </div>

        {/* 2 Column List Layout */}
        <div className="flex-1 grid grid-cols-2 gap-x-[4vw] gap-y-[3vh] items-center">
          {[
            "Trade fewer, stronger setups instead of chasing activity",
            "Risk a consistent small amount on every valid trade",
            "Stop for the day when the loss limit or profit cap is reached",
            "Avoid revenge trading after a stop-loss",
            "Review losing trades for rule breaks, not just bad luck",
            "Judge the process across many trades—not one result"
          ].map((bullet, i) => (
            <div key={i} className="flex items-start bg-white/[0.02] border border-white/5 p-[3vh_2vw] rounded-[1vw]">
              <div className="w-[1vw] h-[1vw] mt-[0.6vw] rounded-sm bg-[#14B8A6] mr-[1.5vw] shrink-0" />
              <div className="text-[2.4vw] text-white/90 font-body leading-[1.4] text-pretty">
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
            11
          </div>
        </div>
      </div>
    </div>
  );
}
