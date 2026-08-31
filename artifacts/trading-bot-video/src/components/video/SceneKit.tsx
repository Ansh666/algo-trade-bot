import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

export function SceneFrame({
  children,
  className = "",
  initial = { clipPath: "inset(0 0 0 100%)" },
  exit = { clipPath: "inset(0 100% 0 0)" },
}: {
  children: ReactNode;
  className?: string;
  initial?: MotionProps["initial"];
  exit?: MotionProps["exit"];
}) {
  return (
    <motion.div
      className={`scene ${className}`}
      initial={initial}
      animate={{ clipPath: "inset(0 0% 0 0%)" }}
      exit={exit}
      transition={{ duration: 0.72, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SceneIndex({ index, label }: { index: string; label: string }) {
  return (
    <div
      className="absolute right-[5vw] top-[5.5vh] z-10 flex items-center gap-[1.1vw]"
      style={{ color: "rgba(215,215,202,.54)" }}
    >
      <span className="micro">{label}</span>
      <span className="mono text-[1.05vw] tracking-[.16em]">{index}</span>
    </div>
  );
}

export function SignalDot({ color = "var(--saffron)" }: { color?: string }) {
  return (
    <span
      className="inline-block h-[.48vw] w-[.48vw] rounded-full"
      style={{ background: color, boxShadow: `0 0 0 .28vw ${color}22` }}
    />
  );
}

export function Metric({
  value,
  label,
  accent = "var(--paper)",
}: {
  value: string;
  label: string;
  accent?: string;
}) {
  return (
    <div>
      <div className="mono text-[1.7vw] tracking-[-.04em]" style={{ color: accent }}>
        {value}
      </div>
      <div className="micro mt-[.65vh] uppercase">{label}</div>
    </div>
  );
}

export function TinyLabel({ children, color = "rgba(215,215,202,.56)" }: { children: ReactNode; color?: string }) {
  return (
    <span className="mono text-[.62vw] uppercase tracking-[.12em]" style={{ color }}>
      {children}
    </span>
  );
}

export function CursorLine({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute h-px w-[15vw] ${className}`}
      style={{ background: "var(--saffron)", transformOrigin: "left center" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
    />
  );
}