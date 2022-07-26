import React from 'react';
import Demo from '../ReduxDemo';
import { render, fireEvent, screen } from '$src/test-utils';

describe('test redux demo', () => {
  test('test redux demo decrease and decrease', () => {
    render(<Demo />);
    fireEvent.click(screen.getByText('increase'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    fireEvent.click(screen.getByText('decrease'));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });
});
