import { Code } from "./codeBreaker";

export enum Match {
  POS = "pos",
}

export const score = (code: Code, guess: Code): Match[] => {
  return code
    .map((value, index) => (value == guess[index] ? Match.POS : null))
    .filter((value) => value != null) as Match[];
};
