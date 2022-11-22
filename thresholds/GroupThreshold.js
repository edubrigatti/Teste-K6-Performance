
import http from 'k6/http';
import { group, sleep } from 'k6';

export const options = {
  thresholds: {
    // para cada requisição individual terá um tempo médio de 4seg
    'group_duration{group:::individualRequests}': ['avg < 400'],
    //faz requisição em grupos simultâneamente, mais utilizado mais em requisição de redes
    'group_duration{group:::batchRequests}': ['avg < 200'],
  },
  vus: 1,
  duration: '10s',
};

export default function () {
  group('individualRequests', function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
    http.get('https://test-api.k6.io/public/crocodiles/2/');
    http.get('https://test-api.k6.io/public/crocodiles/3/');
  });

  group('batchRequests', function () {
    http.batch([
      ['GET', `https://test-api.k6.io/public/crocodiles/1/`],
      ['GET', `https://test-api.k6.io/public/crocodiles/2/`],
      ['GET', `https://test-api.k6.io/public/crocodiles/3/`],
    ]);
  });

  sleep(1);
}
