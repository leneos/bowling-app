import { IScore } from "../types/IScore.type";

export const getIsStrike = (obj: IScore): boolean => obj.hits['1'] === 10; 
