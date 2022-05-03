import { getIsStrike } from './getIsStrike';
import { getIsSpare } from './getIsSpare';
import { TScore } from "../types/Score.type";

export const recalculateScores = (scores:  TScore[]) => {
  const newArr = [...scores];
  for (let i = 0; i < newArr.length; i++) {
    let total = null;
    const item = newArr[i];

    const isSpare = getIsSpare(item.hits)
    const isStrike = getIsStrike(item.hits)

    const lastRoundTotal = newArr?.[i - 1]?.total || 0;

    if (i !== 9) {
      if (isSpare && newArr[i + 1].hits['1'] !== null) {
        total = 10 + newArr[i + 1].hits['1'] + lastRoundTotal;
      }
      if (isStrike) {
        if (i + 1 === 9 && newArr[9].hits['1'] !== null && newArr[9].hits['2'] !== null) {
          total = 10 + newArr[9].hits['1'] + newArr[9].hits['2'] + lastRoundTotal;
        }
        if (i + 1 !== 9 && newArr[i + 1].hits['1'] !== null && (newArr[i + 1].hits['2'] !== null || newArr[i + 2].hits['1'] !== null)) {
          total = 10 + newArr[i + 1].hits['1'] + (newArr[i + 1].hits['2'] || newArr[i + 2].hits['1']) + lastRoundTotal;
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
  return newArr;
};