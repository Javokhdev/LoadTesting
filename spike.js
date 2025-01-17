import http from 'k6/http';
import { check } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 0 }, // Start with 0 users
        { duration: '10s', target: 100 }, // Sudden spike to 100 users
        { duration: '30s', target: 0 }, // Drop back to 0
    ],
};

export default function () {
    let res = http.get('http://localhost:8080/v1/user/list?page=1&limit=100');
    check(res, {
        'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
    });
}
