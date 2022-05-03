import { TScore } from "../types/Score.type";
import { getIsStrike } from "./getIsStrike";

describe('getIsStrike', () => {
  test('true', () => {
    const scoreTrue: TScore = {
      id: 0,
      hits: {
        '1': 10,
        '2': null,
        '3': null
      },
      total: null
    }
    const isStrike = getIsStrike(scoreTrue)
    expect(isStrike).toBeTruthy();
  });
  test('false', () => {
    const scoreFalse: TScore = {
      id: 0,
      hits: {
        '1': 1,
        '2': 9,
        '3': null
      },
      total: null
    }
    const isStrikeFalsy = getIsStrike(scoreFalse)
    expect(isStrikeFalsy).toBeFalsy();
  });
  test('last round true', () => {
    const lastRoundStrike: TScore = {
      id: 0,
      hits: {
        '1': 10,
        '2': null,
        '3': null
      },
      total: null
    }
    const isStrikeFalsy = getIsStrike(lastRoundStrike)
    expect(isStrikeFalsy).toBeTruthy();
  });
})

