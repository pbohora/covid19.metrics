import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';
import { API_ROUTES } from '../../constants/apiRoutes';
import { CovidReportParams, CovidStatResponse, CovidStatWithProvinceResponse } from '../../types/api.types';

export const covidApi = createApi({
  reducerPath: 'covidData',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['CovidCountry', 'CovidWorld', 'CovidCountryWithProvince'],
  endpoints: (builder) => ({
    getGlobalCovidTotals: builder.query<CovidStatResponse, void>({
      query: () => ({ url: API_ROUTES.COVID_TOTAL_URL, method: 'GET' }),
      providesTags: ['CovidWorld'],
    }),

    getCountryCovidTotals: builder.query<CovidStatResponse, CovidReportParams | void>({
      query: (params = {}) => ({ url: API_ROUTES.COVID_TOTAL_URL, method: 'GET', params }),
      providesTags: (_result, _error, params) => [{ type: 'CovidCountry', iso: params?.iso }],
    }),

    getCountryCoviedWithProvince: builder.query<CovidStatWithProvinceResponse, CovidReportParams | void>({
      query: (params = {}) => ({ url: API_ROUTES.COVID_COUNTRY_DETAIL_URL, method: 'GET', params }),
      providesTags: (_result, _error, params) => [{ type: 'CovidCountryWithProvince', iso: params?.iso }],
    }),
  }),
});

export const { useGetGlobalCovidTotalsQuery, useGetCountryCovidTotalsQuery, useGetCountryCoviedWithProvinceQuery } =
  covidApi;
