import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';
import { API_ROUTES } from '../../constants/apiRoutes';
import { CovidReportParams } from '../../types/api.types';

export const covidApi = createApi({
  reducerPath: '/covid',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['CovidSummary', 'CovidWorld', 'CovidDayOne'],
  endpoints: (builder) => ({
    getCovidSummary: builder.query<string[], CovidReportParams>({
      query: () => ({ url: API_ROUTES.SUMMARY_TOTAL_URL, method: 'GET' }),
      providesTags: ['CovidSummary'],
    }),
    getCovidWorldTotal: builder.query<string[], CovidReportParams>({
      query: () => ({ url: API_ROUTES.SUMMARY_TOTAL_URL, method: 'GET' }),
      providesTags: ['CovidWorld'],
    }),
  }),
});

export const { useGetCovidSummaryQuery, useGetCovidWorldTotalQuery } = covidApi;
