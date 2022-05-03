import { TScore } from "../types/Score.type";
import { getTestScoresArr } from "./getTestScoresArr";
import { updateScores } from "./updateScores";


describe('updateScores', () => {
  test('normal score', () => {
    const round = 5;
    const testData: TScore[] = getTestScoresArr((index: number) => {
      if (index < round) {
        return {
          '1': 1,
          '2': 2,
          '3': null,
        };
      }
      if (index === round) {
        return {
          '1': 1,
          '2': null,
          '3': null
        }
      }
      return null;
    });
    const currentHitValue = 5;
    const updatedScores = updateScores(testData, currentHitValue);
    expect(testData[round].hits['2']).toBeNull();
    expect(updatedScores[round].hits['2']).toBe(currentHitValue);
  })
  test('strike', () => {
    const round = 5;
    const testData: TScore[] = getTestScoresArr((index: number) => {
      if (index < round) {
        return {
          '1': 1,
          '2': 2,
          '3': null,
        };
      }
      return null
    });
    const currentHitValue = 10;
    const updatedScores = updateScores(testData, currentHitValue)
    expect(testData[round].hits['1']).toBeNull()
    expect(updatedScores[round].hits['1']).toBe(currentHitValue)
  })
})