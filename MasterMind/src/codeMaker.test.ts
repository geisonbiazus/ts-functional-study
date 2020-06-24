import { score } from "./codeMaker";

describe("Code Maker", () => {
  it("Scores same position matches", () => {
    expect(score([0, 0, 0, 0], [1, 1, 1, 1]).pos).toEqual(0);
    expect(score([0, 0, 0, 0], [0, 1, 1, 1]).pos).toEqual(1);
    expect(score([0, 0, 0, 0], [0, 1, 1, 0]).pos).toEqual(2);
    expect(score([1, 1, 1, 1], [0, 1, 1, 1]).pos).toEqual(3);
    expect(score([0, 0, 0, 0], [0, 0, 0, 1]).pos).toEqual(3);
    expect(score([1, 2, 3, 4], [1, 2, 3, 4]).pos).toEqual(4);
  });

  it("Scores same value macthes", () => {
    expect(score([1, 2, 3, 4], [2, 0, 0, 0]).val).toEqual(1);
    expect(score([1, 2, 3, 4], [2, 3, 0, 0]).val).toEqual(2);
    expect(score([1, 2, 3, 4], [2, 3, 4, 0]).val).toEqual(3);
    expect(score([1, 2, 3, 4], [2, 3, 4, 1]).val).toEqual(4);
  });

  it("Scores positions and values together", () => {
    expect(score([1, 2, 3, 4], [2, 0, 0, 0])).toEqual({ pos: 0, val: 1 });
    expect(score([1, 2, 3, 4], [2, 3, 0, 4])).toEqual({ pos: 1, val: 2 });
    expect(score([1, 2, 3, 4], [1, 2, 4, 3])).toEqual({ pos: 2, val: 2 });
  });

  it("does not over count duplicate guesses", () => {
    expect(score([1, 2, 3, 4], [3, 3, 3, 4])).toEqual({ pos: 2, val: 0 });
    expect(score([1, 2, 1, 2], [2, 1, 2, 1])).toEqual({ pos: 0, val: 4 });
    expect(score([1, 1, 1, 2], [2, 1, 1, 1])).toEqual({ pos: 2, val: 2 });
    expect(score([1, 1, 1, 2], [1, 1, 1, 1])).toEqual({ pos: 3, val: 0 });
    expect(score([0, 0, 1, 0], [0, 0, 0, 1])).toEqual({ pos: 2, val: 2 });
  });
});
