export default function Slide10() {
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
          STEP 7
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-[6vh]">
          <div className="text-[#14B8A6] text-[2.4vw] font-bold tracking-[0.15em] uppercase mb-[1vh]">
            Evaluation
          </div>
          <h1 className="text-[3.5vw] font-bold m-0 tracking-[-0.02em] leading-[1.1]">
            Step 7 — Review money and execution records
          </h1>
        </div>

        {/* Data Cards Layout */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-[2vw]">
          {[
            { title: "Wallet", desc: "Shows available, allocated, and realized amounts", val: "A" },
            { title: "Wallet Ledger", desc: "Explains every virtual balance movement", val: "B" },
            { title: "Orders", desc: "Records entries, exits, targets, and stop orders", val: "C" },
            { title: "Trades", desc: "Shows completed outcomes and exit reasons", val: "D" }
          ].map((item, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-[1vw] p-[3vh_3vw] flex items-center justify-between backdrop-blur-[10px]">
              <div className="flex flex-col gap-[1vh] max-w-[80%]">
                <div className="text-[2vw] font-bold text-white leading-none">{item.title}</div>
                <div className="text-[2vw] text-[#94A3B8] font-body leading-[1.4]">
                  {item.desc}
                </div>
              </div>
              <div className="text-[5vw] font-bold text-[#14B8A6]/20">
                {item.val}
              </div>
            </div>
          ))}
          
          <div className="col-span-2 bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-[1vw] p-[2.5vh_3vw] flex items-center justify-center text-center">
            <div className="text-[2.4vw] text-[#14B8A6] font-body font-medium">
              Use these records to separate strategy quality from impulse
            </div>
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
            10
          </div>
        </div>
      </div>
    </div>
  );
}
