import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '.';

describe('Card component', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const renderedCard = render(
      <Card title="Test Title" className="test-class">
        <p>Some child content</p>
      </Card>,
    );
    container = renderedCard.container;
  });

  it('renders the title', () => {
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders children content', () => {
    expect(screen.getByText('Some child content')).toBeInTheDocument();
  });

  it('applies additional className if provided', () => {
    const cardDiv = container.firstChild as HTMLElement;
    expect(cardDiv.className).toMatch(/test-class/);
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
