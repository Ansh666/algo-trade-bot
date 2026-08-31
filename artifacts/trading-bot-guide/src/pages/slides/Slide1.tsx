export default function Slide1() {
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
      <div className="absolute top-[4vh] left-[5vw] right-[5vw] flex justify-between items-center z-10">
        <div className="text-[#14B8A6] text-[2.2vw] font-bold tracking-[0.1em] uppercase">
          AI Trading Bot
        </div>
        <div className="text-[#94A3B8] text-[1.5vw] font-body">
          MISSION CONTROL
        </div>
      </div>

      {/* Left Content Area */}
      <div className="w-[50vw] h-[100vh] flex flex-col justify-center pl-[8vw] pr-[4vw] relative z-0">
        <div className="inline-flex items-center py-[0.5vh] px-[1vw] bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-[2vw] mb-[3vh] self-start">
          <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-[#14B8A6] mr-[0.5vw]" />
          <span className="text-[#14B8A6] text-[1.5vw] font-semibold tracking-[0.05em] uppercase">
            Step-by-Step Guide
          </span>
        </div>
        
        <h1 className="text-[6vw] font-bold leading-[1.1] m-0 mb-[2vh] tracking-[-0.02em]">
          Mission<br />Control
        </h1>
        
        <p className="text-[2.4vw] text-[#94A3B8] m-0 mb-[4vh] leading-[1.4] font-normal font-body max-w-[35vw] text-balance">
          A step-by-step guide to disciplined, paper-first intraday trading for India’s NSE market.
        </p>

        <div className="w-[4vw] h-[0.4vh] bg-[#14B8A6] rounded-[0.2vh]" />
      </div>

      {/* Right Illustration Area */}
      <div className="w-[50vw] h-[100vh] relative flex items-center justify-center">
        {/* Glow effect behind image */}
        <div className="absolute w-[30vw] h-[30vw] bg-[#14B8A6] rounded-full blur-[10vw] opacity-15 z-10" />
        
        <img
          src={`${import.meta.env.BASE_URL}images/hero-isometric.png`}
          alt="Isometric trading command center"
          className="w-[55vw] h-auto max-h-[90vh] object-contain relative z-20 -translate-x-[2vw] translate-y-[2vh] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* Bottom Footer */}
      <div className="absolute bottom-[4vh] left-[5vw] right-[5vw] flex justify-between items-center z-10 border-t border-white/10 pt-[2vh]">
        <div className="text-[#94A3B8] text-[1.5vw] font-body">
          Presentation Deck
        </div>
        <div className="text-[#94A3B8] text-[1.5vw] font-body">
          Confidential
        </div>
      </div>
    </div>
  );
}
