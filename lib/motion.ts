import type { Transition } from "framer-motion";

export const SPRING: Transition = { type: "spring", stiffness: 400, damping: 30 };

export const SPRING_SETTLE: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 22,
};

export const STAMP: Transition = { duration: 0.18, ease: [0.2, 0, 0.38, 1] };
