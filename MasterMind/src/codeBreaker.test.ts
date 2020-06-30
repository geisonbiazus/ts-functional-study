import {
  breakCodeSeq,
  codeToNumber,
  numberToCode,
  incrementCode,
  ScoredGuess,
  breakCode3x2,
  breakCodeDoubleRainbow,
} from './codeBreaker';

describe('Code Breaker', () => {
  describe('breakCodeSeq', () => {
    it('initial guess', () => {
      expect(breakCodeSeq(null, [])).toEqual([0, 0, 0, 0]);
    });

    it('first step for code [1, 2, 3, 4]', () => {
      const pastGuesses: ScoredGuess[] = [{ guess: [0, 0, 0, 0], score: { pos: 0, val: 0 } }];

      expect(breakCodeSeq([0, 0, 0, 0], pastGuesses)).toEqual([1, 1, 1, 1]);
    });

    it('first step for code [0, 0, 0, 1]', () => {
      const pastGuesses: ScoredGuess[] = [{ guess: [0, 0, 0, 0], score: { pos: 3, val: 0 } }];

      expect(breakCodeSeq([0, 0, 0, 0], pastGuesses)).toEqual([0, 0, 0, 1]);
    });

    it('second step for code [0, 0, 1, 0]', () => {
      const pastGuesses: ScoredGuess[] = [{ guess: [0, 0, 0, 1], score: { pos: 2, val: 2 } }];

      expect(breakCodeSeq([0, 0, 0, 1], pastGuesses)).toEqual([0, 0, 1, 0]);
    });

    it('two steps are required for [0, 0, 1, 0]', () => {
      const pastGuesses: ScoredGuess[] = [
        { guess: [0, 0, 0, 0], score: { pos: 3, val: 0 } },
        { guess: [0, 0, 0, 1], score: { pos: 2, val: 2 } },
      ];

      expect(breakCodeSeq([0, 0, 0, 0], pastGuesses)).toEqual([0, 0, 1, 0]);
    });
  });

  describe('breakCode3x2', () => {
    it('starts with [0, 0, 1, 1] for the first guess', () => {
      expect(breakCode3x2(null, [])).toEqual([0, 0, 1, 1]);
    });

    it('guesses [2, 2, 3, 3] for the second guess', () => {
      const pastGuesses: ScoredGuess[] = [{ guess: [0, 0, 1, 1], score: { pos: 0, val: 0 } }];
      expect(breakCode3x2([0, 0, 1, 1], pastGuesses)).toEqual([2, 2, 3, 3]);
    });

    it('guesses [4, 4, 5, 5] for the third guess', () => {
      const pastGuesses: ScoredGuess[] = [
        { guess: [0, 0, 1, 1], score: { pos: 0, val: 0 } },
        { guess: [2, 2, 3, 3], score: { pos: 0, val: 0 } },
      ];
      expect(breakCode3x2([2, 2, 3, 3], pastGuesses)).toEqual([4, 4, 5, 5]);
    });

    it('falls back to sequential after third guess', () => {
      const pastGuesses: ScoredGuess[] = [
        { guess: [0, 0, 1, 1], score: { pos: 0, val: 0 } },
        { guess: [2, 2, 3, 3], score: { pos: 0, val: 0 } },
        { guess: [4, 4, 5, 5], score: { pos: 0, val: 4 } },
      ];
      expect(breakCode3x2([4, 4, 5, 5], pastGuesses)).toEqual([5, 5, 4, 4]);
    });

    it('keeps using sequential after fourth guess. Code: [5, 4, 5, 4]', () => {
      const pastGuesses: ScoredGuess[] = [
        { guess: [0, 0, 1, 1], score: { pos: 0, val: 0 } },
        { guess: [2, 2, 3, 3], score: { pos: 0, val: 0 } },
        { guess: [4, 4, 5, 5], score: { pos: 2, val: 2 } },
        { guess: [4, 5, 4, 5], score: { pos: 0, val: 4 } },
      ];
      expect(breakCode3x2([4, 5, 4, 5], pastGuesses)).toEqual([5, 4, 5, 4]);
    });
  });

  describe('breakCodeDoubleRainbow', () => {
    it('starts with [0, 1, 2, 3] for the first guess', () => {
      expect(breakCodeDoubleRainbow(null, [])).toEqual([0, 1, 2, 3]);
    });

    it('guesses [2, 3, 4, 5] for the second guess', () => {
      const pastGuesses: ScoredGuess[] = [{ guess: [0, 1, 2, 3], score: { pos: 0, val: 0 } }];
      expect(breakCodeDoubleRainbow([0, 1, 2, 3], pastGuesses)).toEqual([2, 3, 4, 5]);
    });

    it('guesses [4, 5, 0, 1] for the third guess', () => {
      const pastGuesses: ScoredGuess[] = [
        { guess: [0, 1, 2, 3], score: { pos: 0, val: 0 } },
        { guess: [2, 3, 4, 5], score: { pos: 0, val: 0 } },
      ];
      expect(breakCodeDoubleRainbow([2, 3, 4, 5], pastGuesses)).toEqual([4, 5, 0, 1]);
    });

    it('falls back to sequential after third guess', () => {
      const pastGuesses: ScoredGuess[] = [
        { guess: [0, 1, 2, 3], score: { pos: 0, val: 4 } },
        { guess: [2, 3, 4, 5], score: { pos: 0, val: 2 } },
        { guess: [4, 5, 0, 1], score: { pos: 0, val: 2 } },
      ];
      expect(breakCodeDoubleRainbow([4, 5, 0, 1], pastGuesses)).toEqual([1, 0, 3, 2]);
    });

    it('keeps using sequential after fourth guess', () => {
      const pastGuesses: ScoredGuess[] = [
        { guess: [0, 1, 2, 3], score: { pos: 0, val: 4 } },
        { guess: [2, 3, 4, 5], score: { pos: 0, val: 2 } },
        { guess: [4, 5, 0, 1], score: { pos: 0, val: 2 } },
        { guess: [1, 0, 3, 2], score: { pos: 0, val: 4 } },
      ];
      expect(breakCodeDoubleRainbow([1, 0, 3, 2], pastGuesses)).toEqual([3, 2, 1, 0]);
    });
  });

  describe('codeToNumber', () => {
    it('converts the guess into an integer number', () => {
      expect(codeToNumber([0, 0, 0, 0])).toEqual(0);
      expect(codeToNumber([0, 0, 0, 1])).toEqual(1);
      expect(codeToNumber([0, 0, 0, 5])).toEqual(5);
      expect(codeToNumber([0, 0, 1, 0])).toEqual(6);
      expect(codeToNumber([0, 0, 1, 1])).toEqual(7);
      expect(codeToNumber([0, 0, 1, 5])).toEqual(11);
      expect(codeToNumber([0, 0, 2, 0])).toEqual(12);
      expect(codeToNumber([0, 1, 0, 0])).toEqual(36);
      expect(codeToNumber([0, 1, 0, 1])).toEqual(37);
      expect(codeToNumber([0, 1, 1, 1])).toEqual(43);
      expect(codeToNumber([1, 1, 1, 1])).toEqual(259);
      expect(codeToNumber([5, 5, 5, 5])).toEqual(6 * 6 * 6 * 6 - 1);
    });
  });

  describe('numberToCode', () => {
    it('converts an integer into a guess', () => {
      expect(numberToCode(0)).toEqual([0, 0, 0, 0]);
      expect(numberToCode(1)).toEqual([0, 0, 0, 1]);
      expect(numberToCode(5)).toEqual([0, 0, 0, 5]);
      expect(numberToCode(6)).toEqual([0, 0, 1, 0]);
      expect(numberToCode(7)).toEqual([0, 0, 1, 1]);
      expect(numberToCode(11)).toEqual([0, 0, 1, 5]);
      expect(numberToCode(12)).toEqual([0, 0, 2, 0]);
      expect(numberToCode(36)).toEqual([0, 1, 0, 0]);
      expect(numberToCode(37)).toEqual([0, 1, 0, 1]);
      expect(numberToCode(43)).toEqual([0, 1, 1, 1]);
      expect(numberToCode(259)).toEqual([1, 1, 1, 1]);
      expect(numberToCode(6 * 6 * 6 * 6 - 1)).toEqual([5, 5, 5, 5]);
    });
  });

  describe('incrementCode', () => {
    it('increments the code', () => {
      expect(incrementCode([0, 0, 0, 0])).toEqual([0, 0, 0, 1]);
      expect(incrementCode([0, 0, 0, 5])).toEqual([0, 0, 1, 0]);
      expect(incrementCode([0, 0, 5, 5])).toEqual([0, 1, 0, 0]);
      expect(incrementCode([0, 5, 5, 5])).toEqual([1, 0, 0, 0]);
      expect(incrementCode([5, 5, 5, 5])).toEqual([0, 0, 0, 0]);
    });
  });
});
