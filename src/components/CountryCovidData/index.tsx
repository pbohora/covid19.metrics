import { FC, useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetCountryCovidTotalsQuery, useGetCountryCovidWithProvinceQuery } from '../../state/covid/covidApi';
import StatSection from '../StatSection';
import WithLoadingErrorWrapper from '../WithLoadingAndError';
import Header from '../Header';
import { useAppSelector } from '../../hooks/storeHooks';
import CountrySelector from '../CountrySelector';
import BarChart from '../BarChart';
import Card from '../Card';
import { ApiErrorResponse } from '../../types/components/WithLoadingAndError.types';
import styles from './CountryCovidData.module.css';
import { CHART_COLORS, PROVINCE_COUNT } from '../../constants/chart';

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
  } = useGetCountryCovidWithProvinceQuery(selectedCountry ? { iso: selectedCountry.iso } : skipToken);

  const sortedCovidProvinceData = useMemo(() => {
    if (!covidProvinceData?.data) return [];

    return [...covidProvinceData.data]
      .sort((a, b) => b.confirmed - a.confirmed)
      .slice(0, PROVINCE_COUNT)
      .map((province) => ({
        confirmed: province.confirmed,
        recovered: province.recovered,
        deaths: province.deaths,
        province: province.region.province,
      }));
  }, [covidProvinceData]);

  const chartAreas = [
    { key: 'confirmed', color: CHART_COLORS.confirmed },
    { key: 'recovered', color: CHART_COLORS.recovered },
    { key: 'deaths', color: CHART_COLORS.deaths },
  ];

  return (
    <div>
      <Header title="Country statistics" size="sm" extra={<CountrySelector />} />
      <WithLoadingErrorWrapper
        isFetching={isFetching || isFetchingProvinceData}
        loading={isLoading || isLoadingProvinceData}
        error={(error || errorProvinceData) as ApiErrorResponse}
      >
        {covidData?.data && <StatSection covidStat={covidData.data} />}

        <Card
          title={`Top ${PROVINCE_COUNT} provinces (based on most confirmed cases)`}
          className={styles.chartContainer}
        >
          <BarChart data={sortedCovidProvinceData} xKey={'province'} areas={chartAreas} />
        </Card>
      </WithLoadingErrorWrapper>
    </div>
  );
};

export default CountryCovidData;
