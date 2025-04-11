import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout: FC = () => {
  return (
    <div>
      <Navbar />
      <main className="layout">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
