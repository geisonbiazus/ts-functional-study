import { Code, breakCodeSeq, ScoredGuess, numberToCode, breakCode3x2, breakCodeDoubleRainbow } from './codeBreaker';
import { calculateScore, Score } from './codeMaker';

export const randomCode = (): Code => {
  return numberToCode(Math.floor(Math.random() * (6 * 6 * 6 * 6 - 1)));
};

export const analyzeStrategies = (timesToRun: number, randomCodeFn = randomCode) => {
  return {
    seq: analyzeStrategy(breakCodeSeq, timesToRun, randomCodeFn),
    _3x2: analyzeStrategy(breakCode3x2, timesToRun, randomCodeFn),
    double_rainbow: analyzeStrategy(breakCodeDoubleRainbow, timesToRun, randomCodeFn),
  };
};

type StrategyFn = (lastGuess: Code | null, pastGuesses: ScoredGuess[]) => Code;

const analyzeStrategy = (strategy: StrategyFn, timesToRun: number, randomCodeFn: () => Code) => {
  const tries: number[] = [];

  for (let i = 0; i < timesToRun; i++) {
    tries.push(autoPlay(strategy, randomCodeFn()));
  }

  tries.sort();

  return {
    mean: mean(tries),
    sigma: sigma(tries),
    min: tries[0],
    max: tries[tries.length - 1],
    median: median(tries),
    hist: hist(tries),
  };
};

export const autoPlay = (strategy: StrategyFn, code: Code = randomCode()): number => {
  return tryNextGuess(strategy, 1, null, code, []);
};

const tryNextGuess = (
  strategy: StrategyFn,
  tries: number,
  lastGuess: Code | null,
  code: Code,
  pastGuesses: ScoredGuess[],
): number => {
  const guess = strategy(lastGuess, pastGuesses);
  const score = calculateScore(code, guess);

  if (isFullScore(score)) return tries;

  return tryNextGuess(strategy, ++tries, guess, code, appendScoredGuess(pastGuesses, guess, score));
};

const isFullScore = (score: Score) => {
  return score.pos == 4 && score.val == 0;
};

const appendScoredGuess = (scoredGuesses: ScoredGuess[], guess: Code, score: Score) => {
  return [...scoredGuesses, { guess, score }];
};

const sum = (x: number[]): number => {
  return x.reduce((acc, v) => acc + v, 0);
};

const mean = (x: number[]): number => {
  return sum(x) / x.length;
};

const sigma = (x: number[]): number => {
  const mn = mean(x);
  const v = sum(x.map(v => Math.pow(v - mn, 2)));
  return Math.sqrt(v / (x.length - 1));
};

const median = (x: number[]): number => {
  return x[Math.floor(x.length / 2)];
};

const hist = (x: number[]): number[] => {
  let previous = -1;
  const hist: number[] = [];
  x.forEach(v => {
    if (v === previous) hist[hist.length - 1]++;
    else hist.push(1);
    previous = v;
  });
  return hist;
};
