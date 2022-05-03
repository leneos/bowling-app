import { TScore } from "../types/Score.type";
import { recalculateScores } from "./recalculateScores";

describe('recalculateScores', () => {
  test('last round all strikes', () => {
    const testData: TScore[] = Array.from({ length: 10 }, (_, index) => {
      if (index === 9) {
        return {
          id: index,
          hits: {
            '1': 10,
            '2': 10,
            '3': 10,
          },
          total: null,
        };
      }
      return {
        id: index,
        hits: {
          '1': 10,
          '2': null,
          '3': null,
        },
        total: null,
      };
    });
    const recalculatedArr = recalculateScores(testData);
    const lastRoundTotal = recalculatedArr[recalculatedArr.length - 1].total
    expect(lastRoundTotal).toBe(300);
  });
  test('all rounds spare', () => {
    const testData: TScore[] = Array.from({ length: 10 }, (_, index) => {
      if (index === 9) {
        return {
          id: index,
          hits: {
            '1': 5,
            '2': 5,
            '3': 5,
          },
          total: null,
        };
      }
      return {
        id: index,
        hits: {
          '1': 5,
          '2': 5,
          '3': null,
        },
        total: null,
      };
    });
    const recalculatedArr = recalculateScores(testData);
    const lastRoundTotal = recalculatedArr[recalculatedArr.length - 1].total;
    const firstRoundTotal = recalculatedArr[0].total;
    expect(firstRoundTotal).toBe(15);
    expect(lastRoundTotal).toBe(150);
  });
  test('not spares not strikes', () => {
    const testData: TScore[] = Array.from({ length: 10 }, (_, index) => {
      if (index === 9) {
        return {
          id: index,
          hits: {
            '1': 1,
            '2': 1,
            '3': null,
          },
          total: null,
        };
      }
      return {
        id: index,
        hits: {
          '1': 1,
          '2': 1,
          '3': null,
        },
        total: null,
      };
    });
    const recalculatedArr = recalculateScores(testData);
    let total = 20;
    for (let i = recalculatedArr.length - 1; i >= 0; i--) {
      total -= recalculatedArr[i].hits['1'] + recalculatedArr[i].hits['2'] + recalculatedArr[i].hits['3']
    }
    expect(total).toBe(0)
  })
})
