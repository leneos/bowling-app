import { ChangeEvent, FormEvent, useState } from 'react';
import { TplayerInfo } from '../../types/PlayerInfo.type';
import SubmitButton from '../ui/SubmitButton';
import './index.scss';

type TStartScreen = {
  getPlayers: (arg: TplayerInfo[]) => void;
};

const StartScreen = ({ getPlayers }: TStartScreen) => {
  const [players, setPlayers] = useState<TplayerInfo[]>([]);
  const [userName, setUserName] = useState('');
  const onUserNameChange = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName.length === 0) {
      return;
    }
    const newPlayers = [...players, { id: players.length, name: userName.toUpperCase() }];
    setPlayers(newPlayers);
    setUserName('');
  };
  const onStartGameClickHandler = () => {
    if (players.length) {
      getPlayers(players);
    }
  };
  const isAddBtnDisabled = userName.length === 0;
  const isStartBtnDisabled = players.length === 0;
  return (
    <div data-testid='start-screen' className='start-screen'>
      <h1>Welcome!</h1>
      <div className='start-screen__players'>
        {players.map((item) => (
          <div key={item.id} className='start-screen__player'>
            player {item.id + 1}: {item.name}
          </div>
        ))}
      </div>
      {players.length < 6 && <form className='start-screen__form' onSubmit={onSubmit}>
        <input placeholder='Enter player name' minLength={1} maxLength={3} className='start-screen__input' type='text' value={userName} onChange={onUserNameChange} />
        <SubmitButton disabled={isAddBtnDisabled} text='add player' />
      </form>}
      <div
        onClick={onStartGameClickHandler}
        className={`start-screen__start-btn${isStartBtnDisabled ? ' start-screen__start-btn--disabled' : ''}`}
      >
        {isStartBtnDisabled ? 'add player to start game' : 'start game'}
      </div>
    </div>
  );
};

export default StartScreen;
