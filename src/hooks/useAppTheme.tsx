import { useEffect, useState, useMemo } from 'react';
import { useAppSelector } from './storeHooks';

const useAppTheme = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const mediaQuery = useMemo(() => window.matchMedia('(prefers-color-scheme: dark)'), []);

  useEffect(() => {
    if (mode === 'auto') {
      const handleChange = () => {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        setTheme(systemTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
      handleChange();

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    setTheme(mode);
  }, [mode, mediaQuery]);

  return theme;
};

export default useAppTheme;
