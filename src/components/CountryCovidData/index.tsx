import { FC, useMemo } from 'react';
import StatSection from '../StatSection';
import { useGetCovidCountryTotalQuery, useGetCovidCountryWithProvinceQuery } from '../../state/covid/covidApi';
import WithLoadingErrorWrapper from '../WithLoadingAndError';
import { ApiErrorResponse } from '../../types/WithLoadingAndError.types';
import Header from '../Header';
import { useAppSelector } from '../../hooks/storeHooks';
import CountrySelector from '../CountrySelector';
import { skipToken } from '@reduxjs/toolkit/query';
import StatsBarChart from '../StatsBarChart';
import Card from '../Card';
import styles from './CountryCovidData.module.css';

const CountryCovidData: FC = () => {
  const { selectedCountry } = useAppSelector((state) => state.selectedCountry);
  const {
    data: covidData,
    isLoading,
    error,
    isFetching,
  } = useGetCovidCountryTotalQuery(selectedCountry ? { iso: selectedCountry.iso } : skipToken);

  const {
    data: covidProvinceData,
    isLoading: isLoadingProvinceData,
    error: errorProvinceData,
    isFetching: isFetchingProvinceData,
  } = useGetCovidCountryWithProvinceQuery(selectedCountry ? { iso: selectedCountry.iso } : skipToken);

  const sortedCovidProvinceData = useMemo(() => {
    if (!covidProvinceData?.data) return [];

    return [...covidProvinceData.data]
      .sort((a, b) => b.confirmed - a.confirmed)
      .slice(0, 8)
      .map((province) => ({
        confirmed: province.confirmed,
        recovered: province.recovered,
        deaths: province.deaths,
        province: province.region.province,
      }));
  }, [covidProvinceData]);

  console.log(isLoading, isFetching);
  return (
    <div>
      <Header title="Country statistics" size="sm" extra={<CountrySelector />} />
      <WithLoadingErrorWrapper
        isFetching={isFetching || isFetchingProvinceData}
        loading={isLoading || isLoadingProvinceData}
        error={(error || errorProvinceData) as ApiErrorResponse}
      >
        {covidData?.data && <StatSection covidStat={covidData?.data ?? {}} />}
        <Card title="Trends" className={styles.trend__container}>
          <StatsBarChart
            data={sortedCovidProvinceData}
            xKey={'province'}
            areas={[
              { key: 'confirmed', color: '#3b82f6' },
              { key: 'recovered', color: '#7c3aed' },
              { key: 'deaths', color: '#dc2626' },
            ]}
          />
        </Card>
      </WithLoadingErrorWrapper>
    </div>
  );
};

export default CountryCovidData;
