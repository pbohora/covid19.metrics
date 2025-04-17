import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '../../tests/setup/test-utils';
import { screen, waitFor } from '@testing-library/react';
import CountryCovidData from '.';
import { setupStore } from '../../state/store';

import { LoadingErrorWrapperProps } from '../../types/WithLoadingAndError.types';
import { server } from '../../tests/mocks/mockServer';

//mock child components
vi.mock('../WithLoadingAndError', () => ({
  default: ({ children, loading, error }: LoadingErrorWrapperProps) => {
    if (loading) return <div data-testid="loading">Loading...</div>;
    if (error) return <div data-testid="error">Error occurred</div>;
    return children;
  },
}));

vi.mock('../BarChart', () => ({
  default: () => <svg data-testid="bar-chart" />,
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CountryCovidData Component', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const store = setupStore();
    const renderedComponent = renderWithProviders(<CountryCovidData />, { store });
    container = renderedComponent.container;
  });

  it('fetches data and render', async () => {
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    const confirmed = await screen.findByText('12');
    expect(confirmed).toBeInTheDocument();
  });

  it('renders province data in the bar chart', async () => {
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Top 8 provinces/)).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
