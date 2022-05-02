import { TScore } from "../types/Score.type";

export const getCurrentRound = (arr: TScore[]) => {
  let currentRound = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i];
    if (item.hits['1'] === 10 || item.hits['2'] !== null) {
      currentRound = i + 1;
      break;
    }
  }
  return currentRound > 9 ? 9 : currentRound;
}