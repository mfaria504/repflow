import type { Transition } from "framer-motion";

// The site's signature easing: fast out of the gate, long soft landing.
export const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const SPRING: Transition = { type: "spring", stiffness: 400, damping: 30 };

export const SPRING_SETTLE: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 22,
};

export const POP: Transition = { type: "spring", stiffness: 420, damping: 22 };
