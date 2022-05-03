import './index.scss';

type TSubmitButton = {
  disabled?: boolean;
  text?: string;
}

const SubmitButton = ({ disabled = false, text = 'submit' }: TSubmitButton) => {
  return (
    <button data-testid='submit-button' className="submit-btn" disabled={disabled} type='submit'>
      {text}
    </button>
  );
};

export default SubmitButton;
