export default function Slide3() {
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
          PAPER MODE
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-[6vh]">
          <div className="text-[#14B8A6] text-[2.4vw] font-bold tracking-[0.15em] uppercase mb-[1vh]">
            Simulation
          </div>
          <h1 className="text-[3.5vw] font-bold m-0 tracking-[-0.02em] leading-[1.1]">
            Start safely: understand Paper Mode
          </h1>
        </div>

        <div className="flex-1 flex gap-[4vw]">
          <div className="flex-1 flex flex-col justify-center">
            {/* Visual element on left */}
            <div className="w-full aspect-square rounded-[2vw] bg-[#14B8A6]/5 border border-[#14B8A6]/20 relative flex items-center justify-center overflow-hidden">
               <div className="absolute w-[20vw] h-[20vw] bg-[#14B8A6] rounded-full blur-[8vw] opacity-20 z-0" />
               <div className="relative z-10 text-center">
                 <div className="text-[6vw] font-bold text-white leading-none mb-[2vh]">SIM</div>
                 <div className="text-[1.5vw] text-[#14B8A6] uppercase tracking-[0.2em] font-semibold">Environment Active</div>
               </div>
            </div>
          </div>
          
          <div className="flex-[1.5] flex flex-col justify-center gap-[3vh]">
            {[
              "Paper Mode simulates trades without moving broker funds",
              "Seeded market data lets you explore every workflow safely",
              "Live Upstox execution is not connected in the current build",
              "Practice until the rules feel routine—not exciting",
              "Never treat simulated results as guaranteed future returns"
            ].map((bullet, i) => (
              <div key={i} className="flex items-start">
                <div className="w-[0.8vw] h-[0.8vw] mt-[0.6vw] rounded-sm bg-[#14B8A6] mr-[1.5vw] shrink-0" />
                <div className="text-[2vw] text-white/90 font-body leading-[1.4] text-pretty">
                  {bullet}
                </div>
              </div>
            ))}
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
            03
          </div>
        </div>
      </div>
    </div>
  );
}
