import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the workshop demo page', () => {
  render(<App />);
  const linkElement = screen.getByText(/serverless workshop demo/i);
  expect(linkElement).toBeInTheDocument();
});
