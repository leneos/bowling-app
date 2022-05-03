import { memo } from 'react';
import './index.scss';

const RestartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div data-testid='restart-btn' onClick={onClick} className='restart-btn'>
      restart
    </div>
  );
};

export default memo(RestartButton);
