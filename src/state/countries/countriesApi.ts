import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';
import { API_ROUTES } from '../../constants/apiRoutes';

export const countriesApi = createApi({
  reducerPath: '/countries',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Countries'],
  endpoints: (builder) => ({
    getCountries: builder.query<string[], void>({
      query: () => ({ url: API_ROUTES.COUNTRIES_URL, method: 'GET' }),
      providesTags: ['Countries'],
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
