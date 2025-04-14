import { FC } from 'react';
import { HeaderProps } from '../../types/Header.types';
import styles from './Header.module.css';

const Header: FC<HeaderProps> = ({ title, size = 'md', extra }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.header__title} ${styles[`header__title__${size}`]}`}>{title}</div>
      {extra && <div className="header__extra">{extra}</div>}
    </header>
  );
};

export default Header;
