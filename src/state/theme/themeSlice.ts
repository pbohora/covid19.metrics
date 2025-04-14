import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode, ThemeState } from '../../types/theme.types';

/**
 * Returns the theme mode from local storage, or 'auto' if it is not set.
 *
 * @returns The theme mode, which is either 'light', 'dark', or 'auto'.
 */
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
