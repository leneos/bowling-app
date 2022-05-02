import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import InputNumber from './components/InputNumber';
import RestartButton from './components/RestartButton';
import ScoresTable from './components/ScoresTable';
import './App.scss';

export interface IScore {
  id: number;
  hits: {
    '1': number | null;
    '2': number | null;
    '3': number | null;
  };
  total: number | null;
}
export const getIsSpare = (obj: IScore): boolean => obj.hits['1'] !== 10 && obj.hits['1'] + obj.hits['2'] === 10
export const getIsStrike = (obj: IScore): boolean => obj.hits['1'] === 10 
interface recalculateScoresI {
  scores: IScore[];
  currentHitValue: number;
}

const initialState = Array.from({ length: 10 }, (_, index) => {
    return ({
      id: index,
      hits: {
        '1': null,
        '2': null,
        '3': null,
      },
      total: null,
    })
  });

const getCurrentHit = (currentScore: IScore) => {
  const firstHit = currentScore.hits['1'];
  const secondHit = currentScore.hits['2'];
  if (firstHit === null) return 1;
  if (secondHit === null) return 2;
  return 3;
}

const getCurrentRound = (arr: IScore[]) => {
  let currentRound = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i];
    if (item.hits['1'] === 10 || item.hits['2'] !== null) {
      currentRound = i + 1;
      break;
    }
  }
  return currentRound > 9 ? 9 : currentRound;
}

const recalculateScores = ({ scores, currentHitValue }: recalculateScoresI) => {
  const newScores = [...scores];
  const currentRound  = getCurrentRound(newScores);
  const currentHit = getCurrentHit(newScores[currentRound])

  newScores[currentRound].hits[currentHit] = currentHitValue;

  for (let i = 0; i < newScores.length; i++) {
    let total = null;
    const item = newScores[i];

    const isSpare = getIsSpare(newScores[i])
    const isStrike = getIsStrike(newScores[i])

    const lastRoundTotal = newScores?.[i - 1]?.total || 0;

    if (i !== 9) {
      if (isSpare && newScores[i + 1].hits['1'] !== null) {
        total = 10 + newScores[i + 1].hits['1'] + lastRoundTotal;
      }
      if (isStrike) {
        if (i + 1 === 9 && newScores[9].hits['1'] !== null && newScores[9].hits['2'] !== null) {
          total = 10 + newScores[9].hits['1'] + newScores[9].hits['2'] + lastRoundTotal;
        }
        if (i + 1 !== 9 && newScores[i + 1].hits['1'] !== null && (newScores[i + 1].hits['2'] !== null || newScores[i + 2].hits['1'] !== null)) {
          total = 10 + newScores[i + 1].hits['1'] + (newScores[i + 1].hits['2'] || newScores[i + 2].hits['1']) + lastRoundTotal;
        }
      }

      if (!isSpare && !isStrike && item.hits['2'] !== null) {
        total = item.hits['1'] + item.hits['2'] + lastRoundTotal;
      }
    }

    if (i === 9) {
      if (isSpare || isStrike) {
        if (item.hits['3'] !== null) {
          total = item.hits['1'] + item.hits['2'] + item.hits['3'] + lastRoundTotal;
        }
      } else {
        if (item.hits['2'] !== null) {
          total = item.hits['1'] + item.hits['2'] + lastRoundTotal;
        }
      }
    }

    item.total = total;
  }
  return newScores;
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [scores, setScores] = useState<IScore[]>(initialState);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === '') {
      return;
    }
    const newScores = recalculateScores({ scores, currentHitValue: +inputValue})
    setScores(newScores);
    setInputValue('');
  };

  const onRestartBtnClickHandler = () => {
    setScores(initialState);
    setInputValue('');
  };

  const isGameFinished = useMemo(() => scores[scores.length - 1].total !== null, [scores]);

  const inputMaxValue = useMemo(() => {
    const currentRound = getCurrentRound(scores)
    const currentHit = getCurrentHit(scores[currentRound])
    const hits = scores[currentRound].hits;
    if (currentRound === 9) {
      return currentHit === 1 ?  10 - (+hits[0] || 0) : 10
    } 
    return  10 - (+hits[currentHit - 1] || 0)
  },[scores]);

  const isSubmitBtnDisabled = inputValue === '';

  return (
    <div className='App'>
      <main>
        <RestartButton onClick={onRestartBtnClickHandler} />
        <ScoresTable scores={scores} />
        {!isGameFinished && <form onSubmit={onSubmit}>
          <InputNumber onChange={onInputChange} max={inputMaxValue} value={inputValue} />
          <button disabled={isSubmitBtnDisabled} type='submit'>
            submit
          </button>
        </form>}
      </main>
    </div>
  );
}

export default App;
