import { AxiosRequestConfig } from 'axios';

export interface AxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}

export interface Country {
  name: string;
  slug: string;
}

export interface SelectedCountryState {
  selectedCountry: Country | null;
}
