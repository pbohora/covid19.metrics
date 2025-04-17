import { FC } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart as ReBarChart,
  Bar,
} from 'recharts';
import { StatsBarChartProps } from '../../types/components/StatsBarChart.types';
import useAppTheme from '../../hooks/useAppTheme';
import NoData from '../Nodata';

const BarChart: FC<StatsBarChartProps> = ({ data = [], xKey, areas, height = 500 }) => {
  const theme = useAppTheme();
  const isDarkMode = theme === 'dark';

  const axisColor = isDarkMode ? '#d4d9e0' : '#2f3947';
  const gridColor = isDarkMode ? '#879cad' : '#414f61';
  const tooltipBg = isDarkMode ? '#414f61' : '#c9d1da';
  const tooltipText = isDarkMode ? '#e1e4e7' : '#1e232b';

  if (!data?.length) return <NoData />;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" stroke={gridColor} />
        <XAxis dataKey={xKey} stroke={axisColor} />
        <YAxis stroke={axisColor} />
        <Tooltip
          contentStyle={{
            backgroundColor: tooltipBg,
            borderColor: tooltipBg,
            color: tooltipText,
          }}
          itemStyle={{ color: tooltipText }}
          labelStyle={{ color: axisColor }}
        />
        <Legend />
        {areas.map((area) => (
          <Bar key={area.key} fill={area.color} opacity={0.6} dataKey={area.key} />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
