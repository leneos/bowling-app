import { getCurrentHit } from "./getCurrentHit";
import { getCurrentRound } from "./getCurrentRound";

test('getCurrentHit', () => {
  const testData = Array.from({ length: 9 }, (_, index) => {
    if (index < 5) {
      return {
        id: index,
        hits: {
          '1': 1,
          '2': 2,
          '3': null,
        },
        total: null,
      }
    }
    return {
      id: index,
      hits: {
        '1': null,
        '2': null,
        '3': null,
      },
      total: null,
    };
  });
  const currentRound = getCurrentRound(testData);
  const currentHit = getCurrentHit(testData[currentRound]);
  expect(currentHit).toBe(1);
})