import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAppTheme from '../hooks/useAppTheme';

const Layout: FC = () => {
  const theme = useAppTheme();

  return (
    <div data-theme={theme} className="layout">
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
