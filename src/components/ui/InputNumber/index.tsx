import { ChangeEvent, KeyboardEvent, memo } from 'react';
import './index.scss';
interface IInputNumber {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  max?: number;
}
const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => ['e', 'E', '+', '-', ',', '.'].includes(e.key) && e.preventDefault();

const InputNumber = ({ onChange, max = 10, value }: IInputNumber) => {
  return <input data-testid='input-number' className='input-number' type='number' onKeyDown={onKeyDown} max={max} min={0} value={value} onChange={onChange} />;
};

export default memo(InputNumber);
