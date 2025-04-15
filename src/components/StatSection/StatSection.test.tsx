import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import StatSection from '.';
import { StatSectionProps } from '../../types/StatSection.types';
import { CardProps } from '../../types/Card.types';

vi.mock('../Card', () => ({
  default: ({ title, children, className }: CardProps) => (
    <div className={className}>
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

vi.mock('../Nodata', () => ({
  default: () => <span data-testid="no-data">No Data</span>,
}));

describe('StatSection', () => {
  const mockStats: StatSectionProps['covidStat'] = {
    confirmed: 1000000,
    active: 250000,
    deaths: 50000,
    recovered: 700000,
    date: '2023-07-06',
    last_update: '2023-07-06',
    confirmed_diff: 100,
    deaths_diff: 10,
    recovered_diff: 10,
    active_diff: 10,
    fatality_rate: 1,
  };

  it('renders all stat cards with formatted values', () => {
    render(<StatSection covidStat={mockStats} />);
    expect(screen.getByText('Total Cases')).toBeInTheDocument();
    expect(screen.getByText('1,000,000')).toBeInTheDocument();

    expect(screen.getByText('Active cases')).toBeInTheDocument();
    expect(screen.getByText('250,000')).toBeInTheDocument();

    expect(screen.getByText('Total deaths')).toBeInTheDocument();
    expect(screen.getByText('50,000')).toBeInTheDocument();

    expect(screen.getByText('Recovered')).toBeInTheDocument();
    expect(screen.getByText('700,000')).toBeInTheDocument();
  });

  it('renders NoData when a stat value is null or undefined', () => {
    const incompleteStats = {
      confirmed: 0,
      active: null,
      deaths: 1000,
      recovered: null,
      date: '2023-07-06',
      last_update: '2023-07-06',
      confirmed_diff: 100,
      deaths_diff: 10,
      recovered_diff: 10,
      active_diff: 10,
      fatality_rate: 1,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    render(<StatSection covidStat={incompleteStats} />);

    expect(screen.getAllByTestId('no-data')).toHaveLength(3);
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<StatSection covidStat={mockStats} />);
    expect(container).toMatchSnapshot();
  });
});
