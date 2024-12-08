import {describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders correct headline', () => {
    render(<App />);

    screen.debug();

    // check if App components renders headline
  });
});

describe('something truthy and falsy', () => {
    if('true to be true', () => {
        expect(true).toBe(true);
    });

    it('false to be false', () => {
        expect(false).toBe(false);
    });
})