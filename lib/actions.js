import { atom } from "jotai";

export const increment =
  (delta = 1) =>
  (prev) =>
    prev + delta;

export const decrement =
  (delta = 1) =>
  (prev) =>
    prev - delta < 0 ? 0 : prev - delta;

export const countAtom = atom(0);
