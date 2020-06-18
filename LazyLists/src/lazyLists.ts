export type Iterator = (base: number) => number;

export function integers(): Iterator {
  return (base) => base + 1;
}

export function squaresOf(iterator: Iterator): Iterator {
  return (base) => {
    const num = iterator(base);
    return num * num;
  };
}

export function take(amount: number, iterator: Iterator): number[] {
  const baseArray = new Array<number>(amount).fill(0);

  return baseArray.map((val: number, i: number) => iterator(i));
}
