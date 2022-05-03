import { THits } from "../types/Score.type";

export const getIsSpare = (hits: THits): boolean => hits['1'] !== 10 && hits['1'] + hits['2'] === 10;
