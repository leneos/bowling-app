import { TScore } from "../types/Score.type";

export const getCurrentHit = (currentScore: TScore) => {
  const firstHit = currentScore.hits['1'];
  const secondHit = currentScore.hits['2'];
  if (firstHit === null) return 1;
  if (secondHit === null) return 2;
  return 3;
}