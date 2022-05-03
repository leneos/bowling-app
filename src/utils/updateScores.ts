import { TScore } from '../types/Score.type';
import { getCurrentHit } from './getCurrentHit';
import { getCurrentRound } from './getCurrentRound';

export const updateScores = (scores: TScore[], currentHitValue: number) => {
  const copyArr = [...scores];
  const currentRound = getCurrentRound(copyArr);
  const currentHit = getCurrentHit(copyArr[currentRound]);
  copyArr.splice(currentRound, 1, {
    ...copyArr[currentRound],
    hits: { ...copyArr[currentRound].hits, [currentHit]: currentHitValue },
  });
  return copyArr;
};
