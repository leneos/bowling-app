import  ScoreBox  from '.';
import { render, screen } from "@testing-library/react";
import { TScore } from '../../types/Score.type';

describe('ScoreBox', () => {
  test('empty', () => {
    const scoreTrue: TScore = {
      id: 0,
      hits: {
        '1': null,
        '2': null,
        '3': null
      },
      total: null
    }
    render(<ScoreBox item={scoreTrue} />)
    const hitsContainer = screen.queryByTestId('hits');
    const firstHit = screen.queryByTestId('first-hit');
    const secondHit = screen.queryByTestId('second-hit');
    const thirdHit = screen.queryByTestId('third-hit');
    const total = screen.queryByTestId('total');
    expect(hitsContainer).toBeInTheDocument()
    expect(firstHit).toBeEmptyDOMElement()
    expect(secondHit).toBeEmptyDOMElement()
    expect(thirdHit).toBeNull();
    expect(total).toBeEmptyDOMElement()
  })
  test('not spare, not strike', () => {
    const scoreFalse: TScore = {
      id: 1,
      hits: {
        '1': 1,
        '2': 2,
        '3': null
      },
      total: 3
    }
    render(<ScoreBox item={scoreFalse} />)
    const firstHit = screen.queryByTestId('first-hit');
    const secondHit = screen.queryByTestId('second-hit');
    const thirdHit = screen.queryByTestId('third-hit');
    const total = screen.queryByTestId('total');
    expect(firstHit).toHaveTextContent('1');
    expect(secondHit).toHaveTextContent('2');
    expect(thirdHit).toBeNull()
    expect(total).toHaveTextContent('3')
  })
  test('spare', () => {
    const scoreFalse: TScore = {
      id: 1,
      hits: {
        '1': 1,
        '2': 9,
        '3': null
      },
      total: null
    }
    render(<ScoreBox item={scoreFalse} />)
    const firstHit = screen.queryByTestId('first-hit');
    const secondHit = screen.queryByTestId('second-hit');
    const thirdHit = screen.queryByTestId('third-hit');
    const total = screen.queryByTestId('total');
    expect(firstHit).toHaveTextContent('1');
    expect(secondHit).toHaveTextContent('/');
    expect(thirdHit).toBeNull()
    expect(total).toBeEmptyDOMElement()
  })
  test('strike', () => {
    const scoreFalse: TScore = {
      id: 1,
      hits: {
        '1': 10,
        '2': null,
        '3': null
      },
      total: null
    }
    render(<ScoreBox item={scoreFalse} />)
    const firstHit = screen.queryByTestId('first-hit');
    const secondHit = screen.queryByTestId('second-hit');
    const thirdHit = screen.queryByTestId('third-hit');
    const total = screen.queryByTestId('total');
    expect(firstHit).toBeEmptyDOMElement();
    expect(secondHit).toHaveTextContent('X');
    expect(thirdHit).toBeNull();
    expect(total).toBeEmptyDOMElement();
  })
  test('last round empty', () => {
    const scoreFalse: TScore = {
      id: 9,
      hits: {
        '1': null,
        '2': null,
        '3': null
      },
      total: null
    }
    render(<ScoreBox item={scoreFalse} />)
    const firstHit = screen.queryByTestId('first-hit');
    const secondHit = screen.queryByTestId('second-hit');
    const thirdHit = screen.queryByTestId('third-hit');
    const total = screen.queryByTestId('total');
    expect(firstHit).toBeEmptyDOMElement();
    expect(secondHit).toBeEmptyDOMElement();
    expect(thirdHit).toBeEmptyDOMElement()
    expect(total).toBeEmptyDOMElement();
  })
  test('last round normal hits', () => {
    const scoreFalse: TScore = {
      id: 9,
      hits: {
        '1': 1,
        '2': 5,
        '3': null
      },
      total: null
    }
    render(<ScoreBox item={scoreFalse} />)
    const firstHit = screen.queryByTestId('first-hit');
    const secondHit = screen.queryByTestId('second-hit');
    const thirdHit = screen.queryByTestId('third-hit');
    const total = screen.queryByTestId('total');
    expect(firstHit).toHaveTextContent('1');
    expect(secondHit).toHaveTextContent('5');
    expect(thirdHit).toBeEmptyDOMElement()
    expect(total).toBeEmptyDOMElement();
  })
  test('last round spare', () => {
    const scoreFalse: TScore = {
      id: 9,
      hits: {
        '1': 1,
        '2': 9,
        '3': 1
      },
      total: null
    }
    render(<ScoreBox item={scoreFalse} />)
    const firstHit = screen.queryByTestId('first-hit');
    const secondHit = screen.queryByTestId('second-hit');
    const thirdHit = screen.queryByTestId('third-hit');
    const total = screen.queryByTestId('total');
    expect(firstHit).toHaveTextContent('1');
    expect(secondHit).toHaveTextContent('/');
    expect(thirdHit).toHaveTextContent('1')
    expect(total).toBeEmptyDOMElement();
  })
  test('last round all strikes', () => {
    const scoreFalse: TScore = {
      id: 9,
      hits: {
        '1': 10,
        '2': 10,
        '3': 10
      },
      total: null
    }
    render(<ScoreBox item={scoreFalse} />)
    const firstHit = screen.queryByTestId('first-hit');
    const secondHit = screen.queryByTestId('second-hit');
    const thirdHit = screen.queryByTestId('third-hit');
    const total = screen.queryByTestId('total');
    expect(firstHit).toHaveTextContent('X');
    expect(secondHit).toHaveTextContent('X');
    expect(thirdHit).toHaveTextContent('X')
    expect(total).toBeEmptyDOMElement();
  })
})
