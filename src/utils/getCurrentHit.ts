import { IScore } from "../types/IScore.type";

export const getCurrentHit = (currentScore: IScore) => {
  const firstHit = currentScore.hits['1'];
  const secondHit = currentScore.hits['2'];
  if (firstHit === null) return 1;
  if (secondHit === null) return 2;
  return 3;
}