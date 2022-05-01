import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import './App.scss';

export interface Score {
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

const initialState = Array.from({ length: 10 }, (item, index) => ({
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

const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => ['e', 'E', '+', '-', ',', '.'].includes(e.key) && e.preventDefault();

function App() {
  const [inputValue, setInputValue] = useState('');
  const [scores, setScores] = useState<Score[]>(initialState);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [currentHit, setCurrentHit] = useState<number>(0);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  useEffect(() => {
    console.log(scores);
  },[scores])

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
  const isInputDisabled = inputValue === '' || currentRound === 10;
  const totalGameScore = scores[9].total !== null && scores[9].total;
  return (
    <div className='App'>
      <main>
        <div onClick={onRestartBtnClickHandler} className='restart'>
          restart
        </div>
        <table>
          <thead>
            <tr>
              {scores.map((item) => (
                <th key={item.id}>{item.id + 1}</th>
              ))}
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {scores.map((item) => {
                const firstHit = item.id === 9 ? (item.hits['1'] === 10 ? 'X' : item.hits['1']) : (item.isStrike ? '' : item.hits['1']);
                const secondHit = item.id === 9 ? (item.hits['2'] === 10 ? 'X' : ((item.hits['1']  !== 10 && item.hits['1'] + item.hits['2'] === 10 )? '/' : item.hits['2'] )) :  (item.isStrike ? 'X' : (item.isSpare ? '/' : item.hits['2']))
                const thirdHit = item.id === 9 ? (item.hits['3'] === 10 ? 'X' : item.hits['3']) : null;
                return (
                  <td key={item.id} className='score-box'>
                    <div className='score-hits'>
                      <div className='first-hit'>{firstHit}</div>
                      <div className='second-hit'>{secondHit}</div>
                      {item.id === 9 && <div className='third-hit'>{thirdHit}</div>}
                    </div>
                    <div className='total'>{item.total}</div>
                  </td>
                );
              })}
              <td>{totalGameScore}</td>
            </tr>
          </tbody>
        </table>
        <form onSubmit={onSubmit}>
          <input
            type='number'
            onKeyDown={onInputKeyDown}
            max={inputMaxValue}
            min={0}
            value={inputValue}
            onChange={onInputChange}
          />
          <button disabled={isInputDisabled} type='submit'>
            submit
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
