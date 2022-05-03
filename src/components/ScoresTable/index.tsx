import { memo } from 'react';
import { TScore } from '../../types/Score.type';
import ScoreBox from '../ScoreBox';
import './index.scss';

type TScoresTable = {
  scores: TScore[];
  playerName: string;
};

const ScoresTable = ({ scores, playerName }: TScoresTable) => {
  const totalGameScore = scores[9].total !== null && scores[9].total;
  return (
    <div className='scores-table'>
      <div className='scores-table__cell'>
        <div className='scores-table__name'>{playerName}</div>
      </div>
      {scores.map((item) => {
        return (
          <div key={item.id} className='scores-table__cell'>
            <div className='scores-table__heading'>{item.id + 1}</div>
            <ScoreBox item={item} />
          </div>
        );
      })}
      <div className='scores-table__cell'>
        <div className='scores-table__heading'>Total Score</div>
        <div className='scores-table__total-game-score'>{totalGameScore}</div>
      </div>
    </div>
  );
};

export default memo(ScoresTable);
