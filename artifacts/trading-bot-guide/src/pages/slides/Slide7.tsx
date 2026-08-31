export default function Slide7() {
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
          STEP 4
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-[6vh]">
          <div className="text-[#14B8A6] text-[2.4vw] font-bold tracking-[0.15em] uppercase mb-[1vh]">
            Watchlist
          </div>
          <h1 className="text-[3.5vw] font-bold m-0 tracking-[-0.02em] leading-[1.1]">
            Step 4 — Check the Stock Universe
          </h1>
        </div>

        {/* Bullet Points with Data viz aesthetic */}
        <div className="flex-1 flex flex-col gap-[3vh] w-full max-w-[85vw]">
          {[
            "Open Stock Universe to review monitored NSE symbols",
            "Focus on liquid names with reliable intraday movement",
            "Compare price, volume, EMA, VWAP, and nearby levels",
            "Avoid instruments with weak liquidity or unclear structure",
            "A smaller high-quality watchlist beats constant random scanning"
          ].map((bullet, i) => (
            <div key={i} className="flex items-center bg-gradient-to-r from-white/[0.05] to-transparent border-l-[0.4vw] border-[#14B8A6] rounded-r-[1vw] p-[2.5vh_3vw]">
              <div className="text-[3vw] font-bold text-white/10 mr-[3vw] w-[4vw] text-right font-body tracking-tighter shrink-0">
                0{i + 1}
              </div>
              <div className="text-[2vw] text-white/90 font-body leading-[1.4] text-pretty">
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
            07
          </div>
        </div>
      </div>
    </div>
  );
}
