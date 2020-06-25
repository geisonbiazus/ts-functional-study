import { Code, breakCode } from './codeBreaker';
import { score } from './codeMaker';

export const autoPlay = (code: Code): number => {
  const guess = breakCode(null, []);
  const guessScore = score(code, guess);

  if (guessScore.pos == 4 && guessScore.val == 0) return 1;

  return 2;
};
