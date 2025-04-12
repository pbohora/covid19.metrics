import { FC } from 'react';
import StatSection from '../StatSection';
import { useGetCovidWorldTotalQuery } from '../../state/covid/covidApi';
import WithLoadingErrorWrapper from '../WithLoadingAndError';
import { ApiErrorResponse } from '../../types/WithLoadingAndError.types';

const GlobalCovidData: FC = () => {
  const { data: covidData, isLoading, error } = useGetCovidWorldTotalQuery();

  return (
    <WithLoadingErrorWrapper loading={isLoading} error={error as ApiErrorResponse}>
      <StatSection
        confirmedCases={covidData?.data?.confirmed ?? 0}
        totalDeaths={covidData?.data?.deaths ?? 0}
        activeCases={covidData?.data?.active ?? 0}
      />
    </WithLoadingErrorWrapper>
  );
};

export default GlobalCovidData;
