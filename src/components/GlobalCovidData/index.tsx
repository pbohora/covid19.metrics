import { FC } from 'react';
import StatSection from '../StatSection';
import { useGetCovidWorldTotalQuery } from '../../state/covid/covidApi';
import WithLoadingErrorWrapper from '../WithLoadingAndError';
import { ApiErrorResponse } from '../../types/WithLoadingAndError.types';
import Header from '../Header';

const GlobalCovidData: FC = () => {
  const { data: covidData, isLoading, error } = useGetCovidWorldTotalQuery();

  return (
    <div>
      <Header title="Global statistics" size="sm" />
      <WithLoadingErrorWrapper loading={isLoading} error={error as ApiErrorResponse}>
        {covidData?.data && <StatSection covidStat={covidData?.data ?? {}} />}
      </WithLoadingErrorWrapper>
    </div>
  );
};

export default GlobalCovidData;
