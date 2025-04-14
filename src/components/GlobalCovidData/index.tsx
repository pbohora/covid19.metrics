import { FC } from 'react';
import { useGetGlobalCovidTotalsQuery } from '../../state/covid/covidApi';
import StatSection from '../StatSection';
import Header from '../Header';
import WithLoadingErrorWrapper from '../WithLoadingAndError';
import { ApiErrorResponse } from '../../types/WithLoadingAndError.types';

const GlobalCovidData: FC = () => {
  const { data: covidData, isLoading, isFetching, error } = useGetGlobalCovidTotalsQuery();

  return (
    <div>
      <Header title="Global statistics" size="sm" />
      <WithLoadingErrorWrapper loading={isLoading} isFetching={isFetching} error={error as ApiErrorResponse}>
        {covidData?.data && <StatSection covidStat={covidData?.data ?? {}} />}
      </WithLoadingErrorWrapper>
    </div>
  );
};

export default GlobalCovidData;
