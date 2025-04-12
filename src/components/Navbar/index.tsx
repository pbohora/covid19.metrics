import { FC } from 'react';
import { AiFillSun, AiFillMoon, AiFillSetting } from 'react-icons/ai';
import Dropdown from '../Dropdown';
import styles from './Navbar.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { changeThemeMode } from '../../state/theme/themeSlice';
import { ThemeMode } from '../../types/theme.types';

const themeOptions = [
  { key: 'light', label: 'Light', value: 'light', icon: <AiFillSun /> },
  { key: 'dark', label: 'Dark', value: 'dark', icon: <AiFillMoon /> },
  { key: 'auto', label: 'Auto', value: 'auto', icon: <AiFillSetting /> },
];

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <header className={styles.navHeader}>
      <nav className={styles.navbar}>
        <h5>C-19 Metrics</h5>
        <Dropdown
          options={themeOptions}
          defaultOption={themeOptions.find((opt) => opt.value === mode)}
          onChange={(option) => dispatch(changeThemeMode(option.value as ThemeMode))}
        />
      </nav>
    </header>
  );
};

export default Navbar;
