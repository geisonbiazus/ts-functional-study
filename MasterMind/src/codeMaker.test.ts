import { score, Match } from "./codeMaker";

describe("Code Maker", () => {
  it("Score guess same position macthes", () => {
    expect(score([0, 0, 0, 0], [1, 1, 1, 1])).toEqual({ pos: 0 });
    expect(score([0, 0, 0, 0], [0, 1, 1, 1])).toEqual({ pos: 1 });
    expect(score([0, 0, 0, 0], [0, 1, 1, 0])).toEqual({ pos: 2 });
    expect(score([1, 1, 1, 1], [0, 1, 1, 1])).toEqual({ pos: 3 });
    expect(score([0, 0, 0, 0], [0, 0, 0, 1])).toEqual({ pos: 3 });
    expect(score([1, 2, 3, 4], [1, 2, 3, 4])).toEqual({ pos: 4 });
  });
});
