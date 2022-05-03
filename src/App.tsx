import StartScreen from './components/StartScreen';
import { useState } from 'react';
import Game from './components/Game';
import { TplayerInfo } from './types/PlayerInfo.type';
import Header from './components/ui/Layout/Header';
import './App.scss';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [players, setPlayers] = useState<TplayerInfo[]>([]);
  const onRestartBtnClickHandler = () => {
    setIsGameStarted(false)
    setPlayers([])
  };
  const getPlayers = (playersArg: TplayerInfo[]) =>{
    setPlayers(playersArg);
    setIsGameStarted(true)
  };
  return (
    <div className='App'>
      <Header isGameStarted={isGameStarted} onRestartBtnClickHandler={onRestartBtnClickHandler} />
      {isGameStarted ? (
        players.length > 0 && players.map((item) => <Game key={item.id} playerInfo={item} />)
      ) : (
        <StartScreen getPlayers={getPlayers} />
      )}
    </div>
  );
}

export default App;
