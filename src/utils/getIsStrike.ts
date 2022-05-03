import { THits } from "../types/Score.type";

export const getIsStrike = (hits: THits): boolean => hits['1'] === 10; 
