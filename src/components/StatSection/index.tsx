import { FC, useMemo } from 'react';
import Card from '../Card';
import { StatSectionProps } from '../../types/StatSection.types';
import styles from './StatSection.module.css';
import NoData from '../Nodata';

const StatSection: FC<StatSectionProps> = ({ covidStat }) => {
  const statItems = useMemo(
    () => [
      { title: 'Total Cases', value: covidStat.confirmed },
      { title: 'Active cases', value: covidStat.active },
      { title: 'Total deaths', value: covidStat.deaths },
      { title: 'Fatality rate', value: covidStat.fatality_rate },
    ],
    [covidStat],
  );

  return (
    <section className={`${styles.statsWrapper}`}>
      {statItems.map((stat) => (
        <Card key={stat.title} title={stat.title} className={styles.statItem}>
          {stat.value ? <h3>{stat.value?.toLocaleString()}</h3> : <NoData />}
        </Card>
      ))}
    </section>
  );
};

export default StatSection;
