export default function Slide12() {
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
          SUMMARY
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full items-center justify-center text-center">
        {/* Glow effect */}
        <div className="absolute w-[40vw] h-[40vw] bg-[#14B8A6] rounded-full blur-[12vw] opacity-10 z-[-1]" />

        <div className="inline-flex items-center py-[0.5vh] px-[1vw] bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-[2vw] mb-[4vh]">
          <span className="text-[#14B8A6] text-[1.5vw] font-semibold tracking-[0.05em] uppercase">
            Conclusion
          </span>
        </div>

        <h1 className="text-[4.5vw] font-bold m-0 tracking-[-0.02em] leading-[1.1] mb-[6vh]">
          Your repeatable daily workflow
        </h1>

        <div className="flex flex-col gap-[2.5vh] w-full max-w-[65vw] mb-[8vh] text-left">
          {[
            "Configure limits → Start in Paper Mode → Scan the watchlist",
            "Validate confluence → Confirm 1:2+ reward-to-risk → Monitor protection",
            "Stop at daily limits → Review trades and wallet ledger → Improve one rule"
          ].map((bullet, i) => (
            <div key={i} className="flex items-center p-[2.5vh_3vw] bg-white/[0.05] border border-white/10 rounded-[1vw] backdrop-blur-[10px]">
              <div className="text-[2.2vw] text-white font-body leading-[1.4] text-pretty">
                {bullet}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-[4vw] border-t border-white/10 pt-[4vh] text-left w-full max-w-[65vw]">
          <div className="flex-1 flex flex-col gap-[1vh]">
            <span className="text-[#94A3B8] text-[1.5vw] uppercase tracking-[0.05em] font-bold">Disclaimer</span>
            <span className="text-[2.4vw] font-medium text-white/80 font-body">Trading involves risk; profits are never guaranteed</span>
          </div>
          <div className="flex-1 flex flex-col gap-[1vh]">
            <span className="text-[#94A3B8] text-[1.5vw] uppercase tracking-[0.05em] font-bold">Notice</span>
            <span className="text-[2.4vw] font-medium text-white/80 font-body">This application is an educational decision-support tool, not financial advice</span>
          </div>
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
            12
          </div>
        </div>
      </div>
    </div>
  );
}
