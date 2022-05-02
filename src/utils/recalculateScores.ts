import { getIsStrike } from './getIsStrike';
import { getIsSpare } from './getIsSpare';
import { TScore } from "../types/Score.type";

export const recalculateScores = (scores:  TScore[]) => {
  for (let i = 0; i < scores.length; i++) {
    let total = null;
    const item = scores[i];

    const isSpare = getIsSpare(item)
    const isStrike = getIsStrike(item)

    const lastRoundTotal = scores?.[i - 1]?.total || 0;

    if (i !== 9) {
      if (isSpare && scores[i + 1].hits['1'] !== null) {
        total = 10 + scores[i + 1].hits['1'] + lastRoundTotal;
      }
      if (isStrike) {
        if (i + 1 === 9 && scores[9].hits['1'] !== null && scores[9].hits['2'] !== null) {
          total = 10 + scores[9].hits['1'] + scores[9].hits['2'] + lastRoundTotal;
        }
        if (i + 1 !== 9 && scores[i + 1].hits['1'] !== null && (scores[i + 1].hits['2'] !== null || scores[i + 2].hits['1'] !== null)) {
          total = 10 + scores[i + 1].hits['1'] + (scores[i + 1].hits['2'] || scores[i + 2].hits['1']) + lastRoundTotal;
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
  return scores;
};