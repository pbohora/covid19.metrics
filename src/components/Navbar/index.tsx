import { FC } from 'react';
import styles from './Navbar.module.css';

const Navbar: FC = () => {
  return (
    <header className={styles.navHeader}>
      <nav className={styles.navbar}>
        <h5>My App</h5>
      </nav>
    </header>
  );
};

export default Navbar;
