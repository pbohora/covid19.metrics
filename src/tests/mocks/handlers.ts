import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.get('https://covid-api.com/api/reports/total', async () => {
    await delay(150);
    return HttpResponse.json({
      data: {
        date: '2020-02-28',
        last_update: '2020-02-01 11:53:00',
        confirmed: 12,
        confirmed_diff: 20,
        deaths: 2,
        deaths_diff: 3,
        recovered: 4,
        recovered_diff: 5,
        active: 6,
        active_diff: 12,
        fatality_rate: 0.1667,
      },
    });
  }),

  http.get('https://covid-api.com/api/reports', async () => {
    await delay(150);
    return HttpResponse.json({
      data: [
        {
          date: '2020-02-28',
          last_update: '2020-02-01 11:53:00',
          confirmed: 120,
          confirmed_diff: 20,
          deaths: 2,
          deaths_diff: 3,
          recovered: 4,
          recovered_diff: 5,
          active: 6,
          active_diff: 12,
          fatality_rate: 0.1667,
          region: {
            iso: 'USA',
            name: 'US',
            province: 'Washington',
            lat: '47.4009',
            long: '-121.4905',
          },
        },
      ],
    });
  }),
];
