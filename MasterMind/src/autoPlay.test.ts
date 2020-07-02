import { autoPlay, randomCode, analyzeStrategies } from './autoPlay';
import { Code, breakCodeSeq } from './codeBreaker';

describe('autoPlay', () => {
  it('breaks the code with 1 try if initial code is correct', () => {
    expect(autoPlay(breakCodeSeq, [0, 0, 0, 0])).toEqual(1);
  });

  it('breaks the code [0, 0, 0, 1] with 2 tries', () => {
    expect(autoPlay(breakCodeSeq, [0, 0, 0, 1])).toEqual(2);
  });

  it('breaks the code [0, 0, 1, 0] with 3 tries', () => {
    expect(autoPlay(breakCodeSeq, [0, 0, 1, 0])).toEqual(3);
  });

  it('breaks a random code and returns the tries when the code is not provided', () => {
    expect(autoPlay(breakCodeSeq)).toBeGreaterThan(0);
  });
});

describe.skip('analyze_strategies', () => {
  it('plays the game many times and returns statistical results for each strategy', () => {
    let codes: Code[] = [
      [0, 5, 0, 3],
      [0, 2, 2, 1],
      [3, 5, 1, 0],
      [1, 1, 1, 1],
      [0, 5, 0, 3],
      [0, 2, 2, 1],
      [3, 5, 1, 0],
      [1, 1, 1, 1],
      [0, 5, 0, 3],
      [0, 2, 2, 1],
      [3, 5, 1, 0],
      [1, 1, 1, 1],
    ];

    const fakeRandomCode = (): Code => {
      const [next, ...rest] = codes;
      codes = rest;
      return next;
    };

    expect(analyzeStrategies(4, fakeRandomCode)).toEqual({
      _3x2: {
        hist: [2, 2],
        max: 6,
        mean: 5.5,
        median: 6,
        min: 5,
        sigma: 0.5773502691896257,
      },
      double_rainbow: {
        hist: [1, 2, 1],
        max: 6,
        mean: 5.0,
        median: 5,
        min: 4,
        sigma: 0.816496580927726,
      },
      seq: {
        hist: [1, 1, 2],
        max: 6,
        mean: 4.75,
        median: 6,
        min: 2,
        sigma: 1.8929694486000912,
      },
    });
  });
});

describe('randomCode', () => {
  it('generates a random Code', () => {
    for (let j = 0; j < 1000; j++) {
      const code: Code = randomCode();

      for (let i = 0; i < 4; i++) {
        expect(code[i]).toBeLessThanOrEqual(5);
        expect(code[i]).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
