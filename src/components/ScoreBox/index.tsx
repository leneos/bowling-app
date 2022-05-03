import { TScore } from '../../types/Score.type';
import { getIsSpare } from '../../utils/getIsSpare';
import { getIsStrike } from '../../utils/getIsStrike';
import './index.scss';

type TScoreBox = {
  item: TScore;
};

const ScoreBox = (({ item }: TScoreBox) => {
  const firstHit = item.id === 9 ? (item.hits['1'] === 10 ? 'X' : item.hits['1']) : getIsStrike(item.hits) ? '' : item.hits['1'];
  const secondHit = item.id === 9
  ? item.hits['2'] === 10
    ? 'X'
    : item.hits['1'] !== 10 && item.hits['1'] + item.hits['2'] === 10
    ? '/'
    : item.hits['2']
  : getIsStrike(item.hits)
  ? 'X'
  : getIsSpare(item.hits)
  ? '/'
  : item.hits['2'];
  const thirdHit = item.id === 9 ? (item.hits['3'] === 10 ? 'X' : item.hits['3']) : null;
  return (
    <div className='score-box'>
      <div data-testid='hits' className='score-box__hits'>
        <div data-testid='first-hit' className='score-box__first'>{firstHit}</div>
        <div data-testid='second-hit' className='score-box__second'>{secondHit}</div>
        {item.id === 9 && <div data-testid='third-hit' className='score-box__third'>{thirdHit}</div>}
      </div>
      <div data-testid='total' className='score-box__total'>{item.total}</div>
    </div>
  );
});

export default ScoreBox;
