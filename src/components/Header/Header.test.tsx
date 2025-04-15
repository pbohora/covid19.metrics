import { render, screen } from '@testing-library/react';
import Header from '.';
import { describe, it, expect } from 'vitest';

describe('Header component', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const renderedHeader = render(<Header title="Test Title" extra={<span>Extra Content</span>} />);
    container = renderedHeader.container;
  });

  it('renders the title', () => {
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies the default size class (md)', () => {
    const titleElement = container.querySelector('div');
    expect(titleElement?.className).toContain('md');
  });

  it('applies custom size class', () => {
    const { container } = render(<Header title="Large Header" size="lg" />);
    const titleElement = container.querySelector('div');
    expect(titleElement?.className).toContain('lg');
  });

  it('renders extra content if provided', () => {
    render(<Header title="Title" />);
    expect(screen.getByText('Extra Content')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
