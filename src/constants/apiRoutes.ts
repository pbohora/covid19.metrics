export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://covid19api.com';

export const API_ROUTES = {
  COUNTRIES_URL: '/countries',
  SUMMARY_URL: '/summary',
  DAYONE_URL: (slug: string) => `/dayone/country/${slug}`,
  WORLD_TOTAL_URL: '/world/total',
};
