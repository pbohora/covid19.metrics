import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import BarChartComponent from '.';
import { StatsBarChartProps } from '../../types/StatsBarChart.types';

// add mocks fo child components
vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
    Bar: ({ dataKey }: { dataKey: string }) => <div data-testid={`bar-${dataKey}`}>{dataKey}</div>,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
  };
});

vi.mock('../../hooks/useAppTheme', () => ({
  default: () => 'light',
}));

vi.mock('../Nodata', () => ({
  default: () => <div data-testid="no-data">No data available</div>,
}));

describe('BarChart component', () => {
  const mockData: StatsBarChartProps['data'] = [
    { province: '', confirmed: 100, deaths: 5, recovered: 2 },
    { province: '', confirmed: 200, deaths: 10, recovered: 1 },
  ];

  const mockAreas: StatsBarChartProps['areas'] = [
    { key: 'confirmed', color: '#00f' },
    { key: 'deaths', color: '#f00' },
    { key: 'recovered', color: '#000' },
  ];

  const defaultProps: StatsBarChartProps = {
    data: mockData,
    xKey: 'province',
    areas: mockAreas,
  };

  let container: HTMLElement;

  beforeEach(() => {
    const renderedBarChart = render(<BarChartComponent {...defaultProps} />);
    container = renderedBarChart.container;
  });

  it('renders the bar chart with all components', () => {
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('grid')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
  });

  it('renders bars for each area', () => {
    mockAreas.forEach((area) => {
      expect(screen.getByTestId(`bar-${area.key}`)).toBeInTheDocument();
    });
  });

  it('renders NoData when data is empty', () => {
    render(<BarChartComponent data={[]} xKey="date" areas={mockAreas} />);
    expect(screen.getByTestId('no-data')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
