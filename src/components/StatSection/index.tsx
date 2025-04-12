import { FC, useMemo } from 'react';
import Card from '../Card';
import { StatSectionProps } from '../../types/StatSection.types';
import styles from './StatSection.module.css';

const StatSection: FC<StatSectionProps> = ({ confirmedCases, totalDeaths, activeCases, direction = 'row' }) => {
  const statItems = useMemo(
    () => [
      { title: 'Total Cases', value: confirmedCases },
      { title: 'Active cases', value: activeCases },
      { title: 'Total deaths', value: totalDeaths },
    ],
    [confirmedCases, totalDeaths, activeCases],
  );

  return (
    <section className={`${styles[direction]} ${styles.statsWrapper}`}>
      {statItems.map((stat) => (
        <Card key={stat.title} size="small" title={stat.title} className={styles.statItem}>
          <h1>{stat.value?.toLocaleString()}</h1>
        </Card>
      ))}
    </section>
  );
};

export default StatSection;
