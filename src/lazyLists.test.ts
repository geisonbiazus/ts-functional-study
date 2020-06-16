import { integers, squaresOf, take } from "./lazyLists";

describe("integers", () => {
  it("returns an iterator that always returns the next integer", () => {
    const iterator = integers();

    expect(iterator()).toEqual(1);
    expect(iterator()).toEqual(2);
    expect(iterator()).toEqual(3);
    expect(iterator()).toEqual(4);
    expect(iterator()).toEqual(5);
    expect(iterator()).toEqual(6);
  });
});

describe("squaresOf", () => {
  it("returns the square of the result of the given function", () => {
    const iterator = squaresOf(integers());

    expect(iterator()).toEqual(1);
    expect(iterator()).toEqual(4);
    expect(iterator()).toEqual(9);
    expect(iterator()).toEqual(16);
    expect(iterator()).toEqual(25);
    expect(iterator()).toEqual(36);
    expect(iterator()).toEqual(49);
    expect(iterator()).toEqual(64);
    expect(iterator()).toEqual(81);
    expect(iterator()).toEqual(100);
  });
});

describe("take", () => {
  it("returns the given number of results of the given iterator", () => {
    expect(take(1, integers())).toEqual([1]);
    expect(take(2, integers())).toEqual([1, 2]);
    expect(take(5, integers())).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("acceptance tests", () => {
  it("returns the first 25 squares of all integers", () => {
    expect(take(25, squaresOf(integers()))).toEqual([
      1,
      4,
      9,
      16,
      25,
      36,
      49,
      64,
      81,
      100,
      121,
      144,
      169,
      196,
      225,
      256,
      289,
      324,
      361,
      400,
      441,
      484,
      529,
      576,
      625,
    ]);
  });
});
