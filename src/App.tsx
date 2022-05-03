import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import InputNumber from './components/ui/InputNumber';
import RestartButton from './components/ui/RestartButton';
import ScoreForm from './components/ScoreForm';
import ScoresTable from './components/ScoresTable';
import { TScore } from './types/Score.type';
import { recalculateScores } from './utils/recalculateScores';
import { getCurrentRound } from './utils/getCurrentRound';
import { getCurrentHit } from './utils/getCurrentHit';
import { updateScores } from './utils/updateScores';
import SubmitButton from './components/ui/SubmitButton';
import './App.scss';
import StartScreen from './components/StartScreen';

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
  const [scores, setScores] = useState<TScore[]>(initialState);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === '') {
      return;
    }
    const updatedScores = updateScores({ scores, currentHitValue: +inputValue });
    const recalculatedScores = recalculateScores(updatedScores);
    setScores(recalculatedScores);
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
      <StartScreen /> 
      <ScoresTable scores={scores} />
      {!isGameFinished && (
        <ScoreForm onSubmit={onSubmit}>
          <InputNumber onChange={onInputChange} max={inputMaxValue} value={inputValue} />
          <SubmitButton disabled={isSubmitBtnDisabled} />
        </ScoreForm>
      )}
    </div>
  );
}

export default App;
