import { FC, useEffect } from 'react';
import { useLazyGetCountriesQuery } from '../state/countries/countriesApi';
import GlobalCovidData from '../components/GlobalCovidData';

const Dashboard: FC = () => {
  const [fetchCountries, { data, error, isLoading }] = useLazyGetCountriesQuery();
  console.log(data, error, isLoading);
  useEffect(() => {
    fetchCountries({ order: 'name' });
  }, [fetchCountries]);
  return (
    <div>
      <h5>Dashboard</h5>
      <GlobalCovidData />
    </div>
  );
};

export default Dashboard;
