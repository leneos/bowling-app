import { TScore } from "../types/Score.type";
import { getCurrentHit } from "./getCurrentHit";
import { getCurrentRound } from "./getCurrentRound";

export const updateScores = (scores: TScore[], currentHitValue: number) => {
  const arrCopy = [...scores]
  const currentRound  = getCurrentRound(arrCopy);
  const currentHit = getCurrentHit(arrCopy[currentRound])
  arrCopy[currentRound].hits[currentHit] = currentHitValue;
  return arrCopy;
}