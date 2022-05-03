import { TScore } from "../types/Score.type";
import { getIsSpare } from "./getIsSpare";

describe('getIsStrike', () => {
  test('getIsStrike true', () => {
    const scoreTrue: TScore = {
      id: 0,
      hits: {
        '1': 1,
        '2': 9,
        '3': null
      },
      total: null
    }
    const isStrike = getIsSpare(scoreTrue)
    expect(isStrike).toBeTruthy();
  });
  test('getIsStrike false', () => {
    const scoreFalse: TScore = {
      id: 1,
      hits: {
        '1': 5,
        '2': 2,
        '3': null
      },
      total: null
    }
    const isStrikeFalsy = getIsSpare(scoreFalse)
    expect(isStrikeFalsy).toBeFalsy();
  });
})

