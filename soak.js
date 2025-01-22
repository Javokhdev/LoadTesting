import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 50 }, // ramp up to 50 users
    { duration: '1h', target: 50 }, // maintain 50 users for 1 hour
    { duration: '5m', target: 0 },  // ramp down to 0 users
  ],
};

export default function () {
  http.get('http://localhost:8080/v1/tag');
  sleep(1);
}
