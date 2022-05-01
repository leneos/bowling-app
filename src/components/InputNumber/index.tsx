import { ChangeEvent, KeyboardEvent } from "react";

interface InputNumberI {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  max: number;
}
const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => ['e', 'E', '+', '-', ',', '.'].includes(e.key) && e.preventDefault();

const InputNumber = ({onChange, max, value }: InputNumberI) => {
  return (
    <input
      type='number'
      onKeyDown={onKeyDown}
      max={max}
      min={0}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputNumber;
