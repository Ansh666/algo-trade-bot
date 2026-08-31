export default function Slide8() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#0F172A] font-display text-white flex">
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
      <div className="absolute top-[4vh] left-[5vw] right-[5vw] flex justify-between items-center z-10 w-[90vw]">
        <div className="text-[#14B8A6] text-[2.2vw] font-bold tracking-[0.1em] uppercase">
          AI Trading Bot
        </div>
        <div className="text-[#94A3B8] text-[1.5vw] font-body">
          STEP 5
        </div>
      </div>

      {/* Left Illustration Area */}
      <div className="w-[50vw] h-[100vh] relative flex items-center justify-center pl-[5vw]">
        {/* Glow effect behind image */}
        <div className="absolute w-[25vw] h-[25vw] bg-[#14B8A6] rounded-full blur-[10vw] opacity-15 z-10" />
        
        <img
          src={`${import.meta.env.BASE_URL}images/signal-engine.png`}
          alt="Isometric signal engine"
          className="w-[45vw] h-auto max-h-[85vh] object-contain relative z-20 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* Right Content Area */}
      <div className="w-[50vw] h-[100vh] flex flex-col justify-center pr-[8vw] pl-[4vw] relative z-10">
        <div className="mb-[6vh]">
          <div className="text-[#14B8A6] text-[2.4vw] font-bold tracking-[0.15em] uppercase mb-[1vh]">
            Analysis
          </div>
          <h1 className="text-[3.5vw] font-bold m-0 tracking-[-0.02em] leading-[1.1]">
            Step 5 — Validate every signal
          </h1>
        </div>
        
        <div className="flex flex-col gap-[3vh]">
          {[
            "Open Live Signals and review the strategy label",
            "Prefer agreement between volume, trend, VWAP, and price structure",
            "Confirm entry, stop-loss, target, and signal score",
            "Reject any setup below the minimum 1:2 reward-to-risk",
            "Skip late entries after price has already made the move"
          ].map((bullet, i) => (
            <div key={i} className="flex items-start bg-white/[0.03] border border-white/5 rounded-[1vw] p-[2.5vh_2vw] backdrop-blur-[5px]">
              <div className="w-[0.8vw] h-[0.8vw] mt-[0.6vw] rounded-[0.2vw] bg-[#14B8A6] mr-[1.5vw] shrink-0" />
              <div className="text-[2.2vw] text-white/90 font-body leading-[1.4] text-pretty">
                {bullet}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute bottom-[4vh] left-[5vw] right-[5vw] flex justify-between items-center z-10 border-t border-white/10 pt-[2vh] w-[90vw]">
        <div className="text-[#94A3B8] text-[1.5vw] font-body">
          Presentation Deck
        </div>
        <div className="flex gap-[2vw] items-center">
          <div className="text-[#94A3B8] text-[1.5vw] font-body">
            Confidential
          </div>
          <div className="text-white text-[1.5vw] font-semibold font-body">
            08
          </div>
        </div>
      </div>
    </div>
  );
}
