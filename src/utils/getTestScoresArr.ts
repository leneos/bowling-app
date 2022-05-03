import { THits } from './../types/Score.type';

export const getTestScoresArr = (getHits: (index: number) => THits) => {
  return Array.from({ length: 10 }, (_, ind) => {
    const value = getHits(ind);
    if (value === null) {
      return {
        id: ind,
        hits: {
          '1': null,
          '2': null,
          '3': null
        },
        total: null
      }
    }
    return {
      id: ind,
      hits: value,
      total: null
    };
  });
};
