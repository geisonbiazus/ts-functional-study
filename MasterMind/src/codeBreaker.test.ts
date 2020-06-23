import { breakCode, guessToNumber } from "./codeBreaker";

describe("Code Breaker", () => {
  it("initial guess", () => {
    expect(breakCode([])).toEqual([0, 0, 0, 0]);
  });
});

describe("guessToNumber", () => {
  it("converts the guess into an integer number", () => {
    expect(guessToNumber([0, 0, 0, 0])).toEqual(0);
    expect(guessToNumber([0, 0, 0, 1])).toEqual(1);
    expect(guessToNumber([0, 0, 0, 5])).toEqual(5);
    expect(guessToNumber([0, 0, 1, 0])).toEqual(6);
    expect(guessToNumber([0, 0, 1, 1])).toEqual(7);
    expect(guessToNumber([0, 0, 1, 5])).toEqual(11);
    expect(guessToNumber([0, 0, 2, 0])).toEqual(12);
    expect(guessToNumber([0, 1, 0, 0])).toEqual(36);
    expect(guessToNumber([0, 1, 0, 1])).toEqual(37);
    expect(guessToNumber([0, 1, 1, 1])).toEqual(43);
    expect(guessToNumber([1, 1, 1, 1])).toEqual(259);
  });
});
