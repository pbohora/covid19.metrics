import { configureStore } from '@reduxjs/toolkit';
import selectedCountryReducer from './countries/selectedCountrySlice';
import themeReducer from './theme/themeSlice';
import { covidApi } from './covid/covidApi';
import { countriesApi } from './countries/countriesApi';

export const store = configureStore({
  reducer: {
    selectedCountry: selectedCountryReducer,
    theme: themeReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [covidApi.reducerPath]: covidApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(countriesApi.middleware, covidApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
