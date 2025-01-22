import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },  // start at 50 users
    { duration: '1m', target: 100 }, // increase to 100 users
    { duration: '1m', target: 200 }, // increase to 200 users
    { duration: '1m', target: 300 }, // increase to 300 users
    { duration: '1m', target: 400 }, // keep increasing until it breaks
    { duration: '1m', target: 0 },   // ramp down
  ],
};

export default function () {
  http.get('http://localhost:8080/v1/tag');
  sleep(1);
}
