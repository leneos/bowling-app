import { TScore } from "../types/Score.type";
import { getIsStrike } from "./getIsStrike";

test('getIsStrike', () => {
  const scoreTrue: TScore = {
    id: 0,
    hits: {
      '1': 10,
      '2': null,
      '3': null
    },
    total: null
  }
  const scoreFalse: TScore = {
    id: 0,
    hits: {
      '1': 1,
      '2': 10,
      '3': null
    },
    total: null
  }
  const isStrike = getIsStrike(scoreTrue)
  expect(isStrike).toBeTruthy();
  const isStrikeFalsy = getIsStrike(scoreFalse)
  expect(isStrikeFalsy).toBeFalsy();
});
