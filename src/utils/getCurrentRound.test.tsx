import { getCurrentRound } from "./getCurrentRound";

const getRandomNumber = (max: number, min: number): number => Math.floor(Math.random() * (max - min + 1) + min);

test('getCurrentRound', () => {
  const rndmNmbr = getRandomNumber(0, 9)
  const testData = Array.from({ length: 9 }, (_, index) => {
    if (index >= rndmNmbr) {
      return {
        id: index,
        hits: {
          '1': null,
          '2': null,
          '3': null
        },
        total: null
      }
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
  const currentRound = getCurrentRound(testData);
  expect(currentRound).toBe(rndmNmbr);
})