import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '../../tests/setup/test-utils';
import { screen, waitFor } from '@testing-library/react';
import GlobalCovidData from '.';
import { setupStore } from '../../state/store';
import { LoadingErrorWrapperProps } from '../../types/WithLoadingAndError.types';
import { server } from '../../tests/mocks/mockServer';

vi.mock('../WithLoadingAndError', () => ({
  default: ({ children, loading, error }: LoadingErrorWrapperProps) => {
    if (loading) return <div data-testid="loading">Loading...</div>;
    if (error) return <div data-testid="error">Error occurred</div>;
    return children;
  },
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('GlobalCovidData Component', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const store = setupStore();
    const renderedGlobalCovidData = renderWithProviders(<GlobalCovidData />, { store });
    container = renderedGlobalCovidData.container;
  });

  it('fetched and renders data', async () => {
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    const confirmed = await screen.findByText('12');
    expect(confirmed).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
