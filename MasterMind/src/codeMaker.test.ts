import { score, Match } from "./codeMaker";

describe("Code Maker", () => {
  it("Score guess with no matches", () => {
    expect(score([0, 0, 0, 0], [1, 1, 1, 1])).toEqual([]);
  });

  it("Score guess with one POS match", () => {
    expect(score([0, 0, 0, 0], [0, 1, 1, 1])).toEqual([Match.POS]);
  });

  it("Score guess with two POS match", () => {
    expect(score([0, 0, 0, 0], [0, 1, 1, 0])).toEqual([Match.POS, Match.POS]);
  });
});
