
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { TplayerInfo } from '../../types/PlayerInfo.type';
import { TScore } from '../../types/Score.type';
import { getCurrentHit } from '../../utils/getCurrentHit';
import { getCurrentRound } from '../../utils/getCurrentRound';
import { recalculateScores } from '../../utils/recalculateScores';
import { updateScores } from '../../utils/updateScores';
import ScoreForm from '../ScoreForm';
import ScoresTable from '../ScoresTable';
import InputNumber from '../ui/InputNumber';
import SubmitButton from '../ui/SubmitButton';

import './index.scss';


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

const Game = ({ playerInfo }: {playerInfo: TplayerInfo}) => {
  const [scores, setScores] = useState<TScore[]>(initialState);
  const [inputValue, setInputValue] = useState('');
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

  const isSubmitBtnDisabled = inputValue === '';

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
  
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

  return (
    <div className='game'>
      <ScoresTable scores={scores} playerName={playerInfo.name} />
      {!isGameFinished && (
        <ScoreForm onSubmit={onSubmit}>
          <InputNumber onChange={onInputChange} max={inputMaxValue} value={inputValue} />
          <SubmitButton disabled={isSubmitBtnDisabled} />
        </ScoreForm>
      )}
    </div>
  );
};

export default Game;
