import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country, SelectedCountryState } from '../../types/api.types';

const initialState: SelectedCountryState = {
  selectedCountry: null,
};

const selectedCountrySlice = createSlice({
  name: 'selectedCountry',
  initialState,
  reducers: {
    setSelectedCountry(state, action: PayloadAction<Country>) {
      state.selectedCountry = action.payload;
    },
    clearSelectedCountry(state) {
      state.selectedCountry = null;
    },
  },
});

export const { setSelectedCountry, clearSelectedCountry } = selectedCountrySlice.actions;

export default selectedCountrySlice.reducer;
