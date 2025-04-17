import { configureStore, combineReducers } from '@reduxjs/toolkit';
import selectedCountryReducer from './countries/selectedCountrySlice';
import themeReducer from './theme/themeSlice';
import { covidApi } from './covid/covidApi';
import { countriesApi } from './countries/countriesApi';

const rootReducer = combineReducers({
  selectedCountry: selectedCountryReducer,
  theme: themeReducer,
  [countriesApi.reducerPath]: countriesApi.reducer,
  [covidApi.reducerPath]: covidApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(countriesApi.middleware, covidApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
