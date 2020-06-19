import { Code } from "./codeBreaker";

export interface Match {
  pos: number; // Digits with the same position and value
  val: number; // Digits with the correct value but different position
}

export const score = (code: Code, guess: Code): Match => {
  const pos = positionMatches(code, guess);
  const val = valueMatches(code, guess);
  return { pos, val: val - pos };
};

const positionMatches = (code: Code, guess: Code): number => {
  return code
    .map((value, index) => value == guess[index])
    .filter((value) => value).length;
};

const valueMatches = (code: Code, guess: Code): number => {
  return guess.map((value) => code.includes(value)).filter((value) => value)
    .length;
};
