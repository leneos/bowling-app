import { memo } from 'react';
import './index.scss';

interface IScoreBox {
  id: number;
  firstHit: number | string | null;
  secondHit: number | string | null;
  thirdHit: number | string | null;
  total: number;
}

const ScoreBox = ({ id, firstHit, secondHit, thirdHit, total }: IScoreBox) => {
  return (
    <td className='score-box'>
      <div className='score-box__hits'>
        <div className='score-box__first'>{firstHit}</div>
        <div className='score-box__second'>{secondHit}</div>
        {id === 9 && <div className='score-box__third'>{thirdHit}</div>}
      </div>
      <div className='score-box__total'>{total}</div>
    </td>
  );
};

export default memo(ScoreBox);
