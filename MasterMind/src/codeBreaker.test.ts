import { breakCode } from "./codeBreaker";

describe("Code Breaker", () => {
  it("initial guess", () => {
    expect(breakCode([])).toEqual([0, 0, 0, 0]);
  });
});
