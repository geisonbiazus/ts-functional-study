export type Code = [number, number, number, number];

export const breakCode = (pastGuesses: Code[]): Code => {
  return [0, 0, 0, 0];
};

export const codeToNumber = (code: Code): number => {
  // return code[0] * 6 * 6 * 6 + code[1] * 6 * 6 + code[2] * 6 + code[3];
  return code.reduce((acc, value) => acc * 6 + value);
};

export const numberToCode = (number: number): Code => {
  return [
    div(number, 6 * 6 * 6),
    div(number, 6 * 6) % 6,
    div(number, 6) % 6,
    number % 6,
  ];
};

const div = (dividend: number, divisor: number): number => {
  return Math.floor(dividend / divisor);
};
