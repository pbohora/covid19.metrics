import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useAppTheme from '../hooks/useAppTheme';

const Layout: FC = () => {
  const theme = useAppTheme();
  console.log(theme);

  return (
    <div data-theme={theme} className="layout">
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
