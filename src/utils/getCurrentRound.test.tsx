import { getCurrentRound } from './getCurrentRound';
import { getTestScoresArr } from './getTestScoresArr';

test('getCurrentRound', () => {
  const testData = getTestScoresArr((index: number) => {
    if (index < 5) {
      return {
        '1': 1,
        '2': 1,
        '3': null,
      };
    }
    return null;
  });
  const currentRound = getCurrentRound(testData);
  expect(currentRound).toBe(5);
});
