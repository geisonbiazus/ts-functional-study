import { Match, score } from "./codeMaker";

export type Code = [number, number, number, number];

export interface ScoredGuess {
  guess: Code;
  score: Match;
}

export const breakCode = (
  lastGuess: Code | null,
  pastGuesses: ScoredGuess[]
): Code => {
  if (!lastGuess) return [0, 0, 0, 0];
  return findNextGuess(incrementCode(lastGuess), pastGuesses);
};

const findNextGuess = (guess: Code, pastGuesses: ScoredGuess[]): Code => {
  if (sameCode(guess, [0, 0, 0, 0]))
    throw new Error("Error finding next guess");

  const guessScore = score(guess, pastGuesses[0].guess);

  if (sameScore(guessScore, pastGuesses[0].score)) return guess;

  return findNextGuess(incrementCode(guess), pastGuesses);
};

const sameCode = (code1: Code, code2: Code): boolean => {
  return JSON.stringify(code1) === JSON.stringify(code2);
};

const sameScore = (score1: Match, score2: Match): boolean => {
  return score1.pos == score2.pos && score1.val == score2.val;
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
