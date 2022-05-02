import { render } from "@testing-library/react";
import ScoreBox from "../components/ScoreBox";
import { TScore } from "../types/Score.type";
import { getIsSpare } from "./getIsSpare";

test('getIsStrike', () => {
  const scoreTrue: TScore = {
    id: 0,
    hits: {
      '1': 1,
      '2': 9,
      '3': null
    },
    total: null
  }
  const scoreFalse: TScore = {
    id: 0,
    hits: {
      '1': 5,
      '2': 2,
      '3': null
    },
    total: null
  }
  render(<ScoreBox id={scoreTrue.id} firstHit={scoreTrue.hits['1']} secondHit={scoreTrue.hits['1']} thirdHit={scoreTrue.hits['1']} total={scoreTrue.total} />)
  const isStrike = getIsSpare(scoreTrue)
  expect(isStrike).toBeTruthy();
  const isStrikeFalsy = getIsSpare(scoreFalse)
  expect(isStrikeFalsy).toBeFalsy();
});
