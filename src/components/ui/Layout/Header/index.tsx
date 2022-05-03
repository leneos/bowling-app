import logo from '../../../../images/logo.png'
import RestartButton from '../../RestartButton';
import './index.scss';
type THeader = {
  onRestartBtnClickHandler: () => void;
}
const Header = ({onRestartBtnClickHandler}: THeader) => {
  return (
    <div className='header'>
      <div className='header__logo-wrapper'>
        <img src={logo} alt='logotype' className='header__logo' />
      </div>
      <RestartButton onClick={onRestartBtnClickHandler} />
    </div>
  );
};

export default Header;
