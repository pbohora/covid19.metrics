import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';
import axios, { AxiosInstance } from 'axios';
import { AxiosBaseQueryArgs } from '../types/api.types';
import { API_BASE_URL } from '../constants/apiRoutes';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      console.log(err);
      return {
        error: {
          status: err.response?.status || 500,
          data: err.message || err.response?.data || 'Unknown error',
        },
      };
    }
  };
