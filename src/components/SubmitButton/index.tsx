import './index.scss';

type TSubmitButton = {
  disabled: boolean;
}

const SubmitButton = ({ disabled }: TSubmitButton) => {
  return (
    <button className="submit-btn" disabled={disabled} type='submit'>
      submit
    </button>
  );
};

export default SubmitButton;
