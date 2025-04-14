const apiUrl = import.meta.env.REACT_APP_BASE_URL;

export const API_BASE_URL = apiUrl || 'https://covid-api.com/api';
export const API_ROUTES = {
  COUNTRIES_URL: '/regions',
  COVID_TOTAL_URL: `/reports/total`,
  COVID_COUNTRY_DETAIL_URL: `/reports`,
};
