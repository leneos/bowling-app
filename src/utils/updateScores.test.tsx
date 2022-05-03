import { TScore } from "../types/Score.type";
import { updateScores } from "./updateScores";

const getRandomNumber = (max: number, min: number): number => Math.floor(Math.random() * (max - min + 1) + min);

describe('updateScores', () => {
  test('normal score', () => {
    const randomNumber = getRandomNumber(0, 9)
    const testData: TScore[] = Array.from({ length: 10 }, (_, index) => {
      if (index > randomNumber) {
        return {
          id: index,
          hits: {
            '1': null,
            '2': null,
            '3': null,
          },
          total: null,
        };
      }
      if (index === randomNumber) {
        return {
          id: index,
          hits: {
            '1': 1,
            '2': null,
            '3': null,
          },
          total: null,
        };
      }
      return {
        id: index,
        hits: {
          '1': 2,
          '2': 2,
          '3': null,
        },
        total: null,
      };
    });
    const currentHitValue = 5;
    const updatedScores = updateScores({scores: testData, currentHitValue})
    const hasScoreBeenUpdated = testData[randomNumber].hits['2'] === null && updatedScores[randomNumber].hits['2'] === currentHitValue;
    expect(hasScoreBeenUpdated).toBeTruthy()
  })
  test('strike', () => {
    const randomNumber = getRandomNumber(0, 9)
    const testData: TScore[] = Array.from({ length: 10 }, (_, index) => {
      if (index > randomNumber) {
        return {
          id: index,
          hits: {
            '1': null,
            '2': null,
            '3': null,
          },
          total: null,
        };
      }
      if (index === randomNumber) {
        return {
          id: index,
          hits: {
            '1': null,
            '2': null,
            '3': null,
          },
          total: null,
        };
      }
      return {
        id: index,
        hits: {
          '1': 2,
          '2': 2,
          '3': null,
        },
        total: null,
      };
    });
    const currentHitValue = 10;
    const updatedScores = updateScores({ scores: testData, currentHitValue })
    const hasScoreBeenUpdated = testData[randomNumber].hits['1'] === null && updatedScores[randomNumber].hits['1'] === currentHitValue;
    expect(hasScoreBeenUpdated).toBeTruthy()
  })
})