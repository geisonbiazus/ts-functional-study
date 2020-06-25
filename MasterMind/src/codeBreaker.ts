import { Score, score } from "./codeMaker";

export type Code = [number, number, number, number];

export interface ScoredGuess {
  guess: Code;
  score: Score;
}

export const breakCode = (
  lastGuess: Code | null,
  pastGuesses: ScoredGuess[]
): Code => {
  if (!lastGuess) return [0, 0, 0, 0];
  return findNextGuess(incrementCode(lastGuess), pastGuesses);
};

const findNextGuess = (guess: Code, pastGuesses: ScoredGuess[]): Code => {
  if (equals(guess, [0, 0, 0, 0])) throw new Error("Error finding next guess");

  if (isSameScore(guess, pastGuesses[0].guess, pastGuesses[0].score))
    return guess;

  return findNextGuess(incrementCode(guess), pastGuesses);
};

const equals = (a: Code | Score, b: Code | Score): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const isSameScore = (code: Code, guess: Code, expected: Score): boolean => {
  const codeScore = score(code, guess);

  return equals(codeScore, expected);
};

export const codeToNumber = (code: Code): number => {
  // return code[0] * 6 * 6 * 6 + code[1] * 6 * 6 + code[2] * 6 + code[3];
  return code.reduce((acc, value) => acc * 6 + value);
};

export const numberToCode = (number: number): Code => {
  return [
    div(number, 6 * 6 * 6) % 6,
    div(number, 6 * 6) % 6,
    div(number, 6) % 6,
    number % 6,
  ];
};

const div = (dividend: number, divisor: number): number => {
  return Math.floor(dividend / divisor);
};

export const incrementCode = (code: Code): Code => {
  return numberToCode(codeToNumber(code) + 1);
};
