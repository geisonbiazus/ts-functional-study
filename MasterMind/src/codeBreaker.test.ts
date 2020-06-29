import { breakCodeSeq, codeToNumber, numberToCode, incrementCode, ScoredGuess } from './codeBreaker';

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
