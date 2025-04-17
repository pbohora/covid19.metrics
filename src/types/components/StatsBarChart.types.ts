export interface StatsBarChartProps {
  data: Array<Record<string, string | number>>;
  xKey: string;
  areas: Array<{ key: string; color: string }>;
  height?: number;
}
