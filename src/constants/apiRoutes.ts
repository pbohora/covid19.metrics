const apiUrl = import.meta.env.REACT_APP_BASE_URL;

export const API_BASE_URL = apiUrl || 'https://covid-api.com/api';
export const API_ROUTES = {
  COUNTRIES_URL: '/regions',
  SUMMARY_TOTAL_URL: `/reports/total`,
};
