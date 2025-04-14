import { FC } from 'react';
import GlobalCovidData from '../components/GlobalCovidData';
import CountryCovidData from '../components/CountryCovidData';

const Dashboard: FC = () => {
  return (
    <section className="dashboard">
      <GlobalCovidData />
      <CountryCovidData />
    </section>
  );
};

export default Dashboard;
