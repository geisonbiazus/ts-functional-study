import { autoPlay } from './autoPlay';

describe('autoPlay', () => {
  it('returns 1 if the initial guess is correct', () => {
    expect(autoPlay([0, 0, 0, 0])).toEqual(1);
  });

  it('the code [0, 0, 0, 1] takes 2 tries', () => {
    expect(autoPlay([0, 0, 0, 1])).toEqual(2);
  });
});
