import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import WithLoadingErrorWrapper from '.';

vi.mock('../LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner" />,
}));

describe('WithLoadingErrorWrapper component', () => {
  it('renders loading spinner when loading is true', () => {
    render(
      <WithLoadingErrorWrapper loading={true} error={null} isFetching={false}>
        Child
      </WithLoadingErrorWrapper>,
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders error message when error is present', () => {
    const error = { status: 500, data: 'Something went wrong' };
    render(
      <WithLoadingErrorWrapper loading={false} error={error} isFetching={false}>
        Child
      </WithLoadingErrorWrapper>,
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('renders children when not loading or error', () => {
    render(
      <WithLoadingErrorWrapper loading={false} error={null} isFetching={false}>
        <p>Child Content</p>
      </WithLoadingErrorWrapper>,
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('shows fetching overlay when isFetching is true', () => {
    render(
      <WithLoadingErrorWrapper loading={false} error={null} isFetching={true}>
        <p>Content</p>
      </WithLoadingErrorWrapper>,
    );

    const spinners = screen.getAllByTestId('loading-spinner');
    expect(spinners.length).toBe(1);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <WithLoadingErrorWrapper loading={false} error={null} isFetching={true}>
        <span>Snapshot Content</span>
      </WithLoadingErrorWrapper>,
    );
    expect(container).toMatchSnapshot();
  });
});
