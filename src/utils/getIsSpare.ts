import { TScore } from "../types/Score.type";

export const getIsSpare = (obj: TScore): boolean => obj.hits['1'] !== 10 && obj.hits['1'] + obj.hits['2'] === 10;
