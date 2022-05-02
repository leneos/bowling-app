import { FormEventHandler, memo } from 'react';
import './index.scss';

interface IScoreForm {
  children: React.ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}
const ScoreForm = ({ children, onSubmit }: IScoreForm) => {
  return (
    <form className='score-form' onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default memo(ScoreForm)