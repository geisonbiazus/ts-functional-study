import { Code } from "./codeBreaker";

export interface Match {
  pos: number;
}

export const score = (code: Code, guess: Code): Match => {
  return { pos: positionMatches(code, guess) };
};

const positionMatches = (code: Code, guess: Code): number => {
  return code
    .map((value, index) => value == guess[index])
    .filter((value) => value).length;
};
