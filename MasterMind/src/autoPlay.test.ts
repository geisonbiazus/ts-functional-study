import { autoPlay } from './autoPlay';

describe('autoPlay', () => {
  it('breaks teh code in 1 try if initial code is correct', () => {
    expect(autoPlay([0, 0, 0, 0])).toEqual(1);
  });

  it('breaks the code [0, 0, 0, 1] in 2 tries', () => {
    expect(autoPlay([0, 0, 0, 1])).toEqual(2);
  });

  // it('breaks the code [0, 0, 1, 0] in 3 tries', () => {
  //   expect(autoPlay([0, 0, 1, 0])).toEqual(3);
  // });
});
