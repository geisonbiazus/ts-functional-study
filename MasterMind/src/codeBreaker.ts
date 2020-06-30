import { Score, calculateScore } from './codeMaker';

export type Code = [number, number, number, number];

export interface ScoredGuess {
  guess: Code;
  score: Score;
}

export const breakCode3x2 = (lastGuess: Code | null, pastGuesses: ScoredGuess[]): Code => {
  switch (pastGuesses.length) {
    case 0:
      return [0, 0, 1, 1];
    case 1:
      return [2, 2, 3, 3];
    case 2:
      return [4, 4, 5, 5];
    case 3:
      return breakCodeSeq([0, 0, 0, 0], pastGuesses);
  }
  return breakCodeSeq(lastGuess, pastGuesses);
};

export const breakCodeDoubleRainbow = (lastGuess: Code | null, pastGuesses: ScoredGuess[]): Code => {
  switch (pastGuesses.length) {
    case 0:
      return [0, 1, 2, 3];
    case 1:
      return [2, 3, 4, 5];
    case 2:
      return [4, 5, 0, 1];
    case 3:
      return breakCodeSeq([0, 0, 0, 0], pastGuesses);
  }
  return breakCodeSeq(lastGuess, pastGuesses);
};

export const breakCodeSeq = (lastGuess: Code | null, pastGuesses: ScoredGuess[]): Code => {
  if (!lastGuess) return [0, 0, 0, 0];
  return findNextGuess(lastGuess, pastGuesses);
};

const findNextGuess = (lastGuess: Code, pastGuesses: ScoredGuess[]): Code => {
  const guess = incrementCode(lastGuess);
  if (equals(guess, [0, 0, 0, 0])) throw new Error('Error finding next guess');

  if (isValidComparingToPastGuesses(guess, pastGuesses)) return guess;

  return findNextGuess(guess, pastGuesses);
};

const isValidComparingToPastGuesses = (guess: Code, pastGuesses: ScoredGuess[]): boolean => {
  return pastGuesses.every((scoreGuess: ScoredGuess) => {
    return isSameScore(guess, scoreGuess.guess, scoreGuess.score);
  });
};

const isSameScore = (code: Code, guess: Code, expected: Score): boolean => {
  const codeScore = calculateScore(code, guess);

  return equals(codeScore, expected);
};

const equals = (a: Code | Score, b: Code | Score): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const codeToNumber = (code: Code): number => {
  // return code[0] * 6 * 6 * 6 + code[1] * 6 * 6 + code[2] * 6 + code[3];
  return code.reduce((acc, value) => acc * 6 + value);
};

export const numberToCode = (number: number): Code => {
  return [div(number, 6 * 6 * 6) % 6, div(number, 6 * 6) % 6, div(number, 6) % 6, number % 6];
};

const div = (dividend: number, divisor: number): number => {
  return Math.floor(dividend / divisor);
};

export const incrementCode = (code: Code): Code => {
  return numberToCode(codeToNumber(code) + 1);
};
