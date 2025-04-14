import { FC } from 'react';
import GlobalCovidData from '../components/GlobalCovidData';
import CountryCovidData from '../components/CountryCovidData';

const Dashboard: FC = () => {
  return (
    <div className="dashboard">
      <GlobalCovidData />

      <CountryCovidData />
    </div>
  );
};

export default Dashboard;
