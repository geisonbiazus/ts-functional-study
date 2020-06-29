import { autoPlay, randomCode } from './autoPlay';
import { Code } from './codeBreaker';

describe('autoPlay', () => {
  it('breaks teh code in 1 try if initial code is correct', () => {
    expect(autoPlay([0, 0, 0, 0])).toEqual(1);
  });

  it('breaks the code [0, 0, 0, 1] in 2 tries', () => {
    expect(autoPlay([0, 0, 0, 1])).toEqual(2);
  });

  it('breaks the code [0, 0, 1, 0] in 3 tries', () => {
    expect(autoPlay([0, 0, 1, 0])).toEqual(3);
  });

  it('breaks a random code and returns the tris when the code is not provided', () => {
    expect(autoPlay()).toBeGreaterThan(0);
  });
});

describe('randomCode', () => {
  it('generates a random Code', () => {
    for (let j = 0; j < 1000; j++) {
      const code: Code = randomCode();

      for (let i = 0; i < 4; i++) {
        expect(code[i]).toBeLessThanOrEqual(5);
        expect(code[i]).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
