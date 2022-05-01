import { ChangeEvent, FormEvent, useState } from 'react';
import InputNumber from './components/InputNumber';
import RestartButton from './components/RestartButton';
import ScoresTable from './components/ScoresTable';
import './App.scss';

export interface ScoreI {
  id: number;
  hits: {
    '1': number | null;
    '2': number | null;
    '3': number | null;
  };
  isSpare: boolean;
  isStrike: boolean;
  total: number | null;
}

const initialState = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  hits: {
    '1': null,
    '2': null,
    '3': null,
  },
  isSpare: false,
  isStrike: false,
  total: null,
}));


function App() {
  const [inputValue, setInputValue] = useState('');
  const [scores, setScores] = useState<ScoreI[]>(initialState);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [currentHit, setCurrentHit] = useState<number>(0);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (inputValue === '') {
      return;
    }

    const newScores = scores.map((item) =>
      item.id === currentRound
        ? {
            ...item,
            hits: {
              ...item.hits,
              [currentHit + 1]: +inputValue,
            },
          }
        : item
    );

    for (let i = 0; i < newScores.length; i++) {
      let total = null;
      const item = newScores[i];
      const lastRoundTotal = newScores?.[i - 1]?.total || 0;
      item.isSpare = item.hits['1'] !== 10 && item.hits['1'] + item.hits['2'] === 10
      item.isStrike = item.hits['1'] === 10
      if (i !== 9) {
        if (item.isSpare && newScores[i + 1].hits['1'] !== null) {
          total = 10 + newScores[i + 1].hits['1'] + lastRoundTotal;
        }
        if (item.isStrike) {
          if (i + 1 === 9 && newScores[9].hits['1'] !== null && newScores[9].hits['2'] !== null) {
            total = 10 + newScores[9].hits['1'] + newScores[9].hits['2'] + lastRoundTotal;  
          }
          if (i + 1 !== 9 && newScores[i + 1].hits['1'] !== null && (newScores[i + 1].hits['2'] !== null || newScores[i + 2].hits['1'] !== null)) {
            total = 10 + newScores[i + 1].hits['1'] + (newScores[i + 1].hits['2'] || newScores[i + 2].hits['1']) + lastRoundTotal
          }
        }

        if (!item.isSpare && !item.isStrike && item.hits['2'] !== null) {
          total = item.hits['1'] + item.hits['2'] + lastRoundTotal;
        }
      } 

      if (i === 9) {
        if (item.isSpare || item.isStrike) {
          if (item.hits['3'] !== null) {
            total = item.hits['1'] + item.hits['2'] + item.hits['3']  + lastRoundTotal         
          }
        } else {
          if (item.hits['2'] !== null) {
            total = item.hits['1'] + item.hits['2'] + lastRoundTotal;
          }
        }
      }

      item.total = total
    }

    if (currentRound === 9) {
      if (currentHit === 0 || (currentHit === 1 && (newScores[9].isStrike || newScores[9].isSpare))) {
        setCurrentHit(currentHit + 1)
      }
    }
    if (currentRound !== 9) {
      if (currentHit === 0) {
        if (inputValue === '10') {
          setCurrentRound((prev) => prev + 1);
        } else {
          setCurrentHit(currentHit + 1);
        }
      } else {
        setCurrentHit(0);
        setCurrentRound((prev) => prev + 1);
      }
    }
    setScores(newScores);
    setInputValue('');
  };

  const onRestartBtnClickHandler = () => {
    setScores(initialState);
    setCurrentHit(0);
    setCurrentRound(0);
    setInputValue('');
  };
  const inputMaxValue = currentRound === 9 ? (currentHit === 1 ? 10 - (+scores[currentRound].hits[0] || 0) : 10): 10 - (+scores[currentRound].hits[currentHit] || 0);
  const isSubmitBtnDisabled = inputValue === '' || currentRound === 10; 
  return (
    <div className='App'>
      <main>
        <RestartButton onClick={onRestartBtnClickHandler}/>
        <ScoresTable scores={scores} />
        <form onSubmit={onSubmit}>
          <InputNumber onChange={onInputChange} max={inputMaxValue} value={inputValue} />
          <button disabled={isSubmitBtnDisabled} type='submit'>
            submit
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
