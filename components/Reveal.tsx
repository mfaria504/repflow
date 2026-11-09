"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EXPO } from "@/lib/motion";

type From = "up" | "left" | "right" | "rise";

const INITIAL: Record<From, Record<string, number | string>> = {
  up: { opacity: 0, y: 40, filter: "blur(8px)" },
  left: { opacity: 0, x: -56, filter: "blur(6px)" },
  right: { opacity: 0, x: 56, filter: "blur(6px)" },
  rise: { opacity: 0, y: 56, rotateX: 14 },
};

export default function Reveal({
  children,
  delay = 0,
  className,
  from = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: From;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      style={
        from === "rise"
          ? { transformOrigin: "50% 100%", transformPerspective: 1400 }
          : undefined
      }
      initial={INITIAL[from]}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
