import { TScore } from "../types/Score.type";

export const getIsStrike = (obj: TScore): boolean => obj.hits['1'] === 10; 
