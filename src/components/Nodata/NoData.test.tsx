import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NoData from '.';

describe('NoData component', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const renderedNoData = render(<NoData />);
    container = renderedNoData.container;
  });

  it('renders the no data icon', () => {
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders no data text', () => {
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
