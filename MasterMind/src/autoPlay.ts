import { Code, breakCode, ScoredGuess, numberToCode } from './codeBreaker';
import { calculateScore, Score } from './codeMaker';

export const autoPlay = (code: Code = randomCode()): number => {
  return tryNextGuess(1, null, code, []);
};

export const randomCode = (): Code => {
  return numberToCode(Math.floor(Math.random() * (6 * 6 * 6 * 6 - 1)));
};

const tryNextGuess = (tries: number, lastGuess: Code | null, code: Code, pastGuesses: ScoredGuess[]): number => {
  const guess = breakCode(lastGuess, pastGuesses);
  const score = calculateScore(code, guess);

  if (isFullScore(score)) return tries;

  return tryNextGuess(++tries, guess, code, appendScoredGuess(pastGuesses, guess, score));
};

const isFullScore = (score: Score) => {
  return score.pos == 4 && score.val == 0;
};

const appendScoredGuess = (scoredGuesses: ScoredGuess[], guess: Code, score: Score) => {
  return [...scoredGuesses, { guess, score }];
};
