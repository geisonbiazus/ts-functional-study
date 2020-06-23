import { breakCode, codeToNumber, numberToCode } from "./codeBreaker";

describe("Code Breaker", () => {
  it("initial guess", () => {
    expect(breakCode([])).toEqual([0, 0, 0, 0]);
  });
});

describe("codeToNumber", () => {
  it("converts the guess into an integer number", () => {
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

describe("numberToCode", () => {
  it("converts an integer into a guess", () => {
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
