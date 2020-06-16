export type Iterator = () => number;

export function integers(): Iterator {
  let result = 0;
  return () => ++result;
}

export function squaresOf(iterator: Iterator): Iterator {
  return () => {
    const num = iterator();
    return num * num;
  };
}

export function take(amount: number, iterator: Iterator): number[] {
  const result: number[] = [];

  for (let i = 0; i < amount; i++) {
    result.push(iterator());
  }
  return result;
}
