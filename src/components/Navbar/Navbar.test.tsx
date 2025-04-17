import { fireEvent, screen } from '@testing-library/react';
import { it, describe, expect, vi } from 'vitest';
import Navbar from '.';
import { renderWithProviders } from '../../tests/setup/test-utils';
import { changeThemeMode } from '../../state/theme/themeSlice';
import { ThemeMode } from '../../types/theme.types';
import { DropdownProps, Option } from '../../types/components/Dropdown.types';

const defaultState = {
  theme: { mode: 'light' as ThemeMode },
};

const handleDispatchMock = vi.fn();

vi.mock('../../hooks/storeHooks', async () => {
  const actual = await vi.importActual<typeof import('../../hooks/storeHooks')>('../../hooks/storeHooks');
  return {
    ...actual,
    useAppDispatch: () => handleDispatchMock,
  };
});

vi.mock('../Dropdown', () => ({
  default: ({ options, defaultOption, onChange }: DropdownProps) => (
    <div>
      <div data-testid="theme-dropdown">{defaultOption?.label}</div>
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

describe('Navbar Component', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const renderedNavbar = renderWithProviders(<Navbar />, {
      preloadedState: defaultState,
    });
    container = renderedNavbar.container;
  });

  it('renders the Navbar with the correct theme', () => {
    expect(screen.getByText('C-19 Metrics')).toBeInTheDocument();
    expect(screen.getByTestId('theme-dropdown')).toHaveTextContent('Light');
  });

  it('changes theme when an option is selected', () => {
    const dropdown = screen.getByTestId('theme-dropdown');
    fireEvent.click(dropdown);
    fireEvent.click(screen.getByText('Dark'));

    expect(handleDispatchMock).toHaveBeenCalledWith(changeThemeMode('dark'));
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
