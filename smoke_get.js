import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 10 },  // Ramp up to 10 users
        { duration: '10s', target: 10 }, // Stay at 10 users
        { duration: '5s', target: 0 },   // Ramp down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
        http_req_failed: ['rate<0.01'],   // Error rate should be less than 1%
    },
};

export default function () {
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6IndlYiIsInNlc3Npb25faWQiOiIwNjZhYTQyMy1iZDVjLTQ5ODQtOGJjMy0wMTFiNTE4ZWY5YTUiLCJzdWIiOiIwMzJmNmQ5Yy01Yjc1LTQyMTYtYTA4OC1kN2U3MGRlNTMyYWYiLCJ1c2VyX3JvbGUiOiJ1c2VyIiwidXNlcl90eXBlIjoidXNlciJ9.ugIGOX_o4t2qvEFebb41ZPK_VnxNdAtu14pzX2iCVN0"
    };

    let res = http.get('http://91.206.179.231:8080/v1/course/list?page=1&limit=10&language=uz', { headers: headers });

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
