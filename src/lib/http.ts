import ky from 'ky';

export const httpClient = ky.create({
  prefixUrl: typeof window !== 'undefined' ? window.location.origin : '',
  timeout: 30000,
  retry: {
    limit: 2,
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
});

export const api = {
  getRealEstateData: async () => {
    return httpClient.get('data/belgian-real-estate-data.json').json();
  },
};
