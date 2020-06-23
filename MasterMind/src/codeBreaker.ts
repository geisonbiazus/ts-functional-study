export type Code = [number, number, number, number];

export const breakCode = (pastGuesses: Code[]): Code => {
  return [0, 0, 0, 0];
};

export const guessToNumber = (guess: Code): number => {
  // return guess[0] * 6 * 6 * 6 + guess[1] * 6 * 6 + guess[2] * 6 + guess[3];
  return guess.reduce((acc, value) => acc * 6 + value);
};
