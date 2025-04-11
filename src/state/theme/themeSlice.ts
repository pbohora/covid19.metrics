import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode, ThemeState } from '../../types/theme.types';

const getInitialThemeMode = (): ThemeMode => {
  const storedTheme = localStorage.getItem('themeMode');
  return storedTheme ? JSON.parse(storedTheme) : 'auto';
};

const initialState: ThemeState = {
  mode: getInitialThemeMode(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      localStorage.setItem('themeMode', JSON.stringify(state.mode));
    },
  },
});

export const { changeThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
