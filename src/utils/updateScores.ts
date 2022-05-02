import { TScore } from '../types/Score.type';
import { getCurrentHit } from './getCurrentHit';
import { getCurrentRound } from './getCurrentRound';

type TupdateScores = {
  scores: TScore[];
  currentHitValue: number;
};

export const updateScores = ({ scores, currentHitValue }: TupdateScores) => {
  const copyArr = [...scores];
  const currentRound = getCurrentRound(copyArr);
  const currentHit = getCurrentHit(copyArr[currentRound]);
  copyArr.splice(currentRound, 1, {
    ...copyArr[currentRound],
    hits: { ...copyArr[currentRound].hits, [currentHit]: currentHitValue },
  });
  return copyArr;
};
