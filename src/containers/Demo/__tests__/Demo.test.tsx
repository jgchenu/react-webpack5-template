import React from 'react';
import Demo from '../Demo';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
afterEach(cleanup);
describe('test demo', () => {
  test('test demo decrease and decrease', () => {
    render(<Demo />);
    fireEvent.click(screen.getByText('increase'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    fireEvent.click(screen.getByText('decrease'));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });
});
