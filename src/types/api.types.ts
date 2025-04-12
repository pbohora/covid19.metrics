import { AxiosRequestConfig } from 'axios';

export interface AxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}

export interface Country {
  name: string;
  iso: string;
}

export interface CountryResponse {
  data: Country[];
}

export interface SelectedCountryState {
  selectedCountry: Country | null;
}

export interface CountryParams {
  order?: 'iso' | 'name';
  sort?: 'asc' | 'desc';
}

export interface CovidReportParams {
  iso?: string;
  date?: string;
}

export interface CovidStat {
  date: string;
  last_update: string;
  confirmed: number;
  confirmed_diff: number;
  deaths: number;
  deaths_diff: number;
  recovered: number;
  recovered_diff: number;
  active: number;
  active_diff: number;
  fatality_rate: number;
}

export interface CovidStatResponse {
  data: CovidStat;
}
