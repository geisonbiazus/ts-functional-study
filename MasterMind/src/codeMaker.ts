import { Code } from "./codeBreaker";

export interface Score {
  pos: number; // Digits with the same position and value
  val: number; // Digits with the correct value but different position
}

export const score = (code: Code, guess: Code): Score => {
  const pos = positionMatches(code, guess);
  const val = valueMatches(code, guess);
  const over = overCount(code, guess);
  return { pos, val: val - pos - over };
};

const positionMatches = (code: Code, guess: Code): number => {
  return countTrue(code.map((value, index) => value == guess[index]));
};

const valueMatches = (code: Code, guess: Code): number => {
  return countTrue(guess.map((value) => code.includes(value)));
};

const countTrue = (list: boolean[]): number => {
  return list.filter((value) => value).length;
};

const overCount = (code: Code, guess: Code): number => {
  return unique(code)
    .map((value) => countValue(guess, value) - countValue(code, value))
    .filter((value) => value >= 0)
    .reduce((sum, value) => sum + value, 0);
};

const unique = (list: number[]): number[] => {
  return Array.from<number>(new Set<number>(list));
};

const countValue = (list: number[], value: number): number => {
  return list.filter((v) => v === value).length;
};
