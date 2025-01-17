import http from 'k6/http';
import { check } from 'k6';

export let options = {
    stages: [
      { duration: '1m', target: 10 }, // Gradually increase to 10 users
      { duration: '2m', target: 50 }, // Sustain 50 users
      { duration: '1m', target: 0 }, // Ramp down to 0
    ],
  };
  
  export default function () {
    let res = http.get('http://localhost:8080/v1/user/list?page=1&limit=100');
    check(res, {
      'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
    });
  }
  