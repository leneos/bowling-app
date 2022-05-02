import { IScore } from "../types/IScore.type";

export const getIsSpare = (obj: IScore): boolean => obj.hits['1'] !== 10 && obj.hits['1'] + obj.hits['2'] === 10;
