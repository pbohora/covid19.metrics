import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';
import { API_ROUTES } from '../../constants/apiRoutes';
import { CovidReportParams, CovidStatResponse } from '../../types/api.types';

export const covidApi = createApi({
  reducerPath: '/covid',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['CovidSummary', 'CovidWorld', 'CovidDayOne'],
  endpoints: (builder) => ({
    getCovidWorldTotal: builder.query<CovidStatResponse, CovidReportParams | void>({
      query: () => ({ url: API_ROUTES.SUMMARY_TOTAL_URL, method: 'GET' }),
      providesTags: ['CovidWorld'],
    }),
  }),
});

export const { useGetCovidWorldTotalQuery } = covidApi;
