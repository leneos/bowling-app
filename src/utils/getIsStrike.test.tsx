import { THits } from '../types/Score.type';
import { getIsStrike } from './getIsStrike';

describe('getIsStrike', () => {
  test('should return true', () => {
    const hits: THits = {
      '1': 10,
      '2': null,
      '3': null,
    };
    const isStrike = getIsStrike(hits);
    expect(isStrike).toBeTruthy();
  });
  test('should return false', () => {
    const hits: THits = {
      '1': 1,
      '2': 9,
      '3': null,
    };

    const isStrikeFalsy = getIsStrike(hits);
    expect(isStrikeFalsy).toBeFalsy();
  });
  test('last round strike should be true', () => {
    const hits: THits = {
      '1': 10,
      '2': null,
      '3': null,
    };
    const isStrikeFalsy = getIsStrike(hits);
    expect(isStrikeFalsy).toBeTruthy();
  });
});
