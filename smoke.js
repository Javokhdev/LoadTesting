import http from 'k6/http';
import { check } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export let options = {
  vus: 1, // 10 users
  duration: '30s', // 1 minute
};

export default function () {
  const randomUsername = `user_${randomString(5)}`;
  const randomEmail = `${randomString(5)}@example.com`;

  // Generate a valid random date in YYYY-MM-DD format
  const year = String(Math.floor(Math.random() * 10) + 2000); // Fixed year for simplicity
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'); // 01 to 12
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'); // 01 to 28

  const randomDob = `${year}-${month}-${day}`;

  // Define the payload
  const payload = JSON.stringify({
    username: randomUsername,
    password: 'password123',
    email: randomEmail,
    address: '123 Main St',
    avatar_id: `id_${randomString(8)}`,
    dob: randomDob,
    full_name: `User ${randomString(3)}`,
    photo_url: `https://example.com/avatar/${randomString(5)}.jpg`,
    gender: 'male',
  });

  // Define headers
  const headers = { 
    'Content-Type': 'application/json',
  };

  // Make the POST request
  let res = http.post('http://localhost:8080/v1/auth/register', payload, { headers });

  // Validate response
  check(res, {
    'status is between 200 and 300': (r) => r.status >= 200 && r.status < 300,
  });
}
