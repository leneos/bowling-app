import { render } from "@testing-library/react";
import {screen} from '@testing-library/dom'
import App from "./App";

describe('App test', () => {
  test('header', () => {
    render(<App />)
    const restartBtn = screen.queryByText('restart');
    expect(restartBtn).not.toBeInTheDocument();
    const logo = screen.queryByTestId('logo');
    expect(logo).toBeInTheDocument();
    const startScreen = screen.queryByTestId('start-screen');
    expect(startScreen).toBeInTheDocument();
  })
})