import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';
import { API_ROUTES } from '../../constants/apiRoutes';
import { CountryParams, CountryResponse } from '../../types/api.types';

export const countriesApi = createApi({
  reducerPath: 'countries',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Countries'],
  endpoints: (builder) => ({
    getCountries: builder.query<CountryResponse, CountryParams | void>({
      query: (params = {}) => ({ url: API_ROUTES.COUNTRIES_URL, method: 'GET', params }),
      providesTags: ['Countries'],
    }),
  }),
});

export const { useGetCountriesQuery, useLazyGetCountriesQuery } = countriesApi;
