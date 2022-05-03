import { THits } from '../types/Score.type';
import { getIsSpare } from './getIsSpare';

describe('getIsSpare', () => {
  test('getIsSpare true', () => {
    const hits: THits = {
      '1': 1,
      '2': 9,
      '3': null,
    };
    const isStrike = getIsSpare(hits);
    expect(isStrike).toBeTruthy();
  });
  test('getIsSpare false', () => {
    const hits: THits = {
      '1': 5,
      '2': 2,
      '3': null,
    };
    const isStrikeFalsy = getIsSpare(hits);
    expect(isStrikeFalsy).toBeFalsy();
  });
});
