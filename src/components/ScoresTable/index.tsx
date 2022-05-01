import { ScoreI } from "../../App";
import ScoreBox from "../ScoreBox";
import './index.scss';

interface ScoresTableI {
  scores: ScoreI[];
}
const ScoresTable = ({ scores }: ScoresTableI) =>{
  const totalGameScore = scores[9].total !== null && scores[9].total;
  return (
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
            const firstHit = item.id === 9 ? (item.hits['1'] === 10 ? 'X' : item.hits['1']) : item.isStrike ? '' : item.hits['1'];
            const secondHit =
              item.id === 9
                ? item.hits['2'] === 10
                  ? 'X'
                  : item.hits['1'] !== 10 && item.hits['1'] + item.hits['2'] === 10
                  ? '/'
                  : item.hits['2']
                : item.isStrike
                ? 'X'
                : item.isSpare
                ? '/'
                : item.hits['2'];
            const thirdHit = item.id === 9 ? (item.hits['3'] === 10 ? 'X' : item.hits['3']) : null;
            return (
              <ScoreBox id={item.id} firstHit={firstHit} secondHit={secondHit} thirdHit={thirdHit} total={item.total} />
            );
          })}
          <td>{totalGameScore}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ScoresTable;
