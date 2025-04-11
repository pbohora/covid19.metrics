import { FC, useEffect } from 'react';
import { useLazyGetCountriesQuery } from '../state/countries/countriesApi';

const Dashboard: FC = () => {
  const [fetchCountries, { data, error, isLoading }] = useLazyGetCountriesQuery();
  console.log(data, error, isLoading);
  useEffect(() => {
    fetchCountries({ order: 'name' });
  }, [fetchCountries]);
  return (
    <div className="page-center">
      <div className="content">
        <h6>Dashboard</h6>
      </div>
    </div>
  );
};

export default Dashboard;
