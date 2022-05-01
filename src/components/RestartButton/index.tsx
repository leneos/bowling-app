import { memo } from 'react';
import './index.scss';

const RestartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick} className='restart-btn'>
      restart
    </div>
  );
};

export default memo(RestartButton);
