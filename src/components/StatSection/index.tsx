import { FC, useMemo } from 'react';
import Card from '../Card';
import NoData from '../Nodata';
import { StatSectionProps } from '../../types/components/StatSection.types';
import styles from './StatSection.module.css';

const StatSection: FC<StatSectionProps> = ({ covidStat }) => {
  const statItems = useMemo(
    () => [
      { title: 'Total Cases', value: covidStat.confirmed },
      { title: 'Active cases', value: covidStat.active },
      { title: 'Total deaths', value: covidStat.deaths },
      { title: 'Recovered', value: covidStat.recovered },
    ],
    [covidStat],
  );

  return (
    <section className={`${styles.statsWrapper}`}>
      {statItems.map((stat) => (
        <Card key={stat.title} title={stat.title} className={styles.statItem}>
          {stat.value !== null && stat.value !== undefined ? <h3>{stat.value.toLocaleString()}</h3> : <NoData />}
        </Card>
      ))}
    </section>
  );
};

export default StatSection;
