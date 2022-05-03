import { fireEvent, render, screen } from '@testing-library/react';
import Game from '.';

describe('test game', () => {
  test('input', () => {
    const testPlayerInfo = { id: 0, name: 'VOV' };
    render(<Game playerInfo={testPlayerInfo} />);
    const gameElement = screen.getByTestId('game-0');
    expect(gameElement).toBeInTheDocument();
    const inputElement = screen.getByTestId('input-number');
    const submitBtnElement = screen.getByTestId('submit-button');
    fireEvent.change(inputElement, { target: { value: '10' } });
    fireEvent.submit(submitBtnElement);
    expect(screen.getByText('X')).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: '1' } });
    fireEvent.submit(submitBtnElement);
    fireEvent.change(inputElement, { target: { value: '2' } });
    fireEvent.submit(submitBtnElement);
    expect(screen.getByText('13')).toBeInTheDocument();
  });
});
