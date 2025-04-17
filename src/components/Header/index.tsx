import { FC } from 'react';
import { HeaderProps } from '../../types/components/Header.types';
import styles from './Header.module.css';

const Header: FC<HeaderProps> = ({ title, size = 'md', extra }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerTitle} ${styles[size]}`}>{title}</div>
      {extra && <div>{extra}</div>}
    </header>
  );
};

export default Header;
