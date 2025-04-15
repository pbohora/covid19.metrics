import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from '.';

describe('LoadingSpinner component', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const renderedLoadingSpinner = render(<LoadingSpinner />);
    container = renderedLoadingSpinner.container;
  });

  it('renders the loading icon', () => {
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
