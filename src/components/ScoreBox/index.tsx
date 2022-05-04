import { TScore } from '../../types/Score.type';
import './index.scss';

type TScoreBox = {
  item: TScore;
};

const getLastRoundDisplayHits = (hits: TScore['hits']) => {
  const firstHit = hits['1'] === 10 ? 'X' : hits['1']
  const secondHit = hits['2'] === 10 ? 'X' : hits['1'] !== 10 && hits['1'] + hits['2'] === 10 ? '/' : hits['2']
  const thirdHit = hits['3'] === 10 ? 'X' : hits['3']
  return { firstHit, secondHit, thirdHit }
}
const getDisplayHits = (hits: TScore['hits']) => {
  const firstHit = hits['1'] === 10 ? '' : hits['1']
  const secondHit = hits['1'] === 10 ? 'X' : (hits['1'] + hits['2'] === 10) ? '/' : hits['2'];
  const thirdHit = hits['3']
  return { firstHit, secondHit, thirdHit }
}

const ScoreBox = (({ item }: TScoreBox) => {
  const { firstHit, secondHit, thirdHit } = item.id === 9 ? getLastRoundDisplayHits(item.hits) : getDisplayHits(item.hits);
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