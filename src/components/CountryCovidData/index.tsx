import { FC, useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetCountryCovidTotalsQuery, useGetCountryCoviedWithProvinceQuery } from '../../state/covid/covidApi';
import StatSection from '../StatSection';
import WithLoadingErrorWrapper from '../WithLoadingAndError';
import Header from '../Header';
import { useAppSelector } from '../../hooks/storeHooks';
import CountrySelector from '../CountrySelector';
import StatsBarChart from '../StatsBarChart';
import Card from '../Card';
import { ApiErrorResponse } from '../../types/WithLoadingAndError.types';
import styles from './CountryCovidData.module.css';

const CountryCovidData: FC = () => {
  const { selectedCountry } = useAppSelector((state) => state.selectedCountry);
  const {
    data: covidData,
    isLoading,
    error,
    isFetching,
  } = useGetCountryCovidTotalsQuery(selectedCountry ? { iso: selectedCountry.iso } : skipToken);

  const {
    data: covidProvinceData,
    isLoading: isLoadingProvinceData,
    error: errorProvinceData,
    isFetching: isFetchingProvinceData,
  } = useGetCountryCoviedWithProvinceQuery(selectedCountry ? { iso: selectedCountry.iso } : skipToken);

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

  return (
    <div>
      <Header title="Country statistics" size="sm" extra={<CountrySelector />} />
      <WithLoadingErrorWrapper
        isFetching={isFetching || isFetchingProvinceData}
        loading={isLoading || isLoadingProvinceData}
        error={(error || errorProvinceData) as ApiErrorResponse}
      >
        {covidData?.data && <StatSection covidStat={covidData?.data ?? {}} />}
        <Card title="Top 8 provinces (based on most confirmed cases)" className={styles.chartContainer}>
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
