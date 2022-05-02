import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import InputNumber from './components/InputNumber';
import RestartButton from './components/RestartButton';
import ScoreForm from './components/ScoreForm';
import ScoresTable from './components/ScoresTable';
import { IScore } from './types/IScore.type';
import { recalculateScores } from './utils/recalculateScores';
import { getCurrentRound } from './utils/getCurrentRound';
import { getCurrentHit } from './utils/getCurrentHit';
import './App.scss';

const initialState = Array.from({ length: 10 }, (_, index) => {
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

function App() {
  const [inputValue, setInputValue] = useState('');
  const [scores, setScores] = useState<IScore[]>(initialState);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === '') {
      return;
    }
    const newScores = recalculateScores({ scores, currentHitValue: +inputValue });
    setScores(newScores);
    setInputValue('');
  };

  const onRestartBtnClickHandler = () => {
    setScores(initialState);
    setInputValue('');
  };

  const isGameFinished = useMemo(() => scores[scores.length - 1].total !== null, [scores]);

  const inputMaxValue = useMemo(() => {
    const currentRound = getCurrentRound(scores);
    const currentHit = getCurrentHit(scores[currentRound]);
    const hits = scores[currentRound].hits;
    if (currentRound === 9) {
      return currentHit === 1 ? 10 - (+hits[0] || 0) : 10;
    }
    return 10 - (+hits[currentHit - 1] || 0);
  }, [scores]);

  const isSubmitBtnDisabled = inputValue === '';

  return (
    <div className='App'>
      <RestartButton onClick={onRestartBtnClickHandler} />
      <ScoresTable scores={scores} />
      {!isGameFinished && (
        <ScoreForm onSubmit={onSubmit}>
          <InputNumber onChange={onInputChange} max={inputMaxValue} value={inputValue} />
          <button disabled={isSubmitBtnDisabled} type='submit'>
            submit
          </button>
        </ScoreForm>
      )}
    </div>
  );
}

export default App;
