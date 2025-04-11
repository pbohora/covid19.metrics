import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout: FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 100px)', padding: '20px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
