import logo from '../../../../images/logo.png'
import RestartButton from '../../RestartButton';
import './index.scss';
type THeader = {
  onRestartBtnClickHandler: () => void;
  isGameStarted: boolean;
}
const Header = ({onRestartBtnClickHandler, isGameStarted}: THeader) => {
  return (
    <div className='header'>
      <div className='header__logo-wrapper'>
        <img src={logo} alt='logotype' className='header__logo' />
      </div>
      {!isGameStarted && <RestartButton onClick={onRestartBtnClickHandler} />}
    </div>
  );
};

export default Header;
