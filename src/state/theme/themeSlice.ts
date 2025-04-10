import { createSlice } from '@reduxjs/toolkit';
import { ThemeMode, ThemeState } from '../../types/theme.types';

const getInitialDarkMode = (): ThemeMode => {
  const stored = localStorage.getItem('mode');
  return stored ? JSON.parse(stored) : 'light';
};

const initialState: ThemeState = {
  mode: getInitialDarkMode(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      localStorage.setItem('themeMode', JSON.stringify(state.mode));
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
