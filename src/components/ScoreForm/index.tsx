import { FormEventHandler, memo } from 'react';
import './index.scss';

type TScoreForm = {
  children: React.ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
};
const ScoreForm = ({ children, onSubmit }: TScoreForm) => {
  return (
    <form className='score-form' onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default memo(ScoreForm);
