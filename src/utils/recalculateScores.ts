import { getIsStrike } from './getIsStrike';
import { getIsSpare } from './getIsSpare';
import { getCurrentHit } from './getCurrentHit';
import { getCurrentRound } from './getCurrentRound';
import { IScore } from "../types/IScore.type";

type recalculateScoresI = {
  scores: IScore[];
  currentHitValue: number;
}

export const recalculateScores = ({ scores, currentHitValue }: recalculateScoresI) => {
  const newScores = [...scores];
  const currentRound  = getCurrentRound(newScores);
  const currentHit = getCurrentHit(newScores[currentRound])

  newScores[currentRound].hits[currentHit] = currentHitValue;

  for (let i = 0; i < newScores.length; i++) {
    let total = null;
    const item = newScores[i];

    const isSpare = getIsSpare(newScores[i])
    const isStrike = getIsStrike(newScores[i])

    const lastRoundTotal = newScores?.[i - 1]?.total || 0;

    if (i !== 9) {
      if (isSpare && newScores[i + 1].hits['1'] !== null) {
        total = 10 + newScores[i + 1].hits['1'] + lastRoundTotal;
      }
      if (isStrike) {
        if (i + 1 === 9 && newScores[9].hits['1'] !== null && newScores[9].hits['2'] !== null) {
          total = 10 + newScores[9].hits['1'] + newScores[9].hits['2'] + lastRoundTotal;
        }
        if (i + 1 !== 9 && newScores[i + 1].hits['1'] !== null && (newScores[i + 1].hits['2'] !== null || newScores[i + 2].hits['1'] !== null)) {
          total = 10 + newScores[i + 1].hits['1'] + (newScores[i + 1].hits['2'] || newScores[i + 2].hits['1']) + lastRoundTotal;
        }
      }

      if (!isSpare && !isStrike && item.hits['2'] !== null) {
        total = item.hits['1'] + item.hits['2'] + lastRoundTotal;
      }
    }

    if (i === 9) {
      if (isSpare || isStrike) {
        if (item.hits['3'] !== null) {
          total = item.hits['1'] + item.hits['2'] + item.hits['3'] + lastRoundTotal;
        }
      } else {
        if (item.hits['2'] !== null) {
          total = item.hits['1'] + item.hits['2'] + lastRoundTotal;
        }
      }
    }

    item.total = total;
  }
  return newScores;
};