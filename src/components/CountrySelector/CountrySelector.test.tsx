import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../tests/setup/test-utils';
import CountrySelector from '.';
import { setupStore } from '../../state/store';
import { LoadingErrorWrapperProps } from '../../types/components/WithLoadingAndError.types';
import { DropdownProps, Option } from '../../types/components/Dropdown.types';

// Mock child components
vi.mock('../WithLoadingAndError', () => ({
  default: ({ children, loading, error }: LoadingErrorWrapperProps) => {
    if (loading) return <div data-testid="loading">Loading...</div>;
    if (error) return <div data-testid="error">Error occurred</div>;
    return children;
  },
}));

vi.mock('../Dropdown', () => ({
  default: ({ options, defaultOption, onChange }: DropdownProps) => (
    <div>
      <div data-testid="country-dropdown">{defaultOption?.label}</div>
      <ul>
        {options.map((opt: Option) => (
          <li key={opt.key}>
            <button data-testid={`option-${opt.value}`} onClick={() => onChange(opt)}>
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  ),
}));

describe('CountrySelector component', () => {
  let store: ReturnType<typeof setupStore>;
  let container: HTMLElement;

  beforeEach(() => {
    store = setupStore();
    const renderedCountrySelector = renderWithProviders(<CountrySelector />, { store });
    container = renderedCountrySelector.container;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders countries and selects the first by default if none is selected', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('country-dropdown')).toBeInTheDocument();
      const selected = store.getState().selectedCountry.selectedCountry;
      expect(selected).toEqual({ iso: 'AFG', name: 'Afghanistan' });
    });
  });

  it('renders dropdown and allows selection change', async () => {
    await waitFor(() => {
      const dropdown = screen.getByTestId('country-dropdown');
      fireEvent.click(dropdown);
      fireEvent.click(screen.getByTestId('option-FIN'));
      const selected = store.getState().selectedCountry.selectedCountry;
      expect(selected).toEqual({ iso: 'FIN', name: 'Finland' });
    });
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
