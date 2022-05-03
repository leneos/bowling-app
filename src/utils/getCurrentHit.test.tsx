import { getCurrentHit } from "./getCurrentHit";
import { getCurrentRound } from "./getCurrentRound";
import { getTestScoresArr } from "./getTestScoresArr";

test('getCurrentHit', () => {
  const testData = getTestScoresArr((index: number) => {
    if (index < 5) {
      return {
        '1': 1,
        '2': null,
        '3': null,
      };
    }
    return null;
  });
  const currentRound = getCurrentRound(testData);
  const currentHit = getCurrentHit(testData[currentRound]);
  expect(currentHit).toBe(2);
})