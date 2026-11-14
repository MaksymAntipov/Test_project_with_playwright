import { USER_ACCESS_TOKEN } from '../../config/auth';
import { test, expect } from '../../fixtures/pages';
import testData from '../../helpers/testData.json';
import fs from 'fs';

test('Get token', async ({ request }) => {
  const response = await request.post(`https://web-api.dev.mbooks.net/api/v1/auth/phone/`, {
    headers: {
      'SKIP-SIGNATURE': '1',
    },
    data: {
      phone: `380${testData.phoneNumber}`,
      action: 'verify',
      code: testData.validOtp,
    },
  });
  expect(response.status).toBe(200);
  const responseJson = await response.json();
  const accessToken = responseJson.data.access_token;
  fs.writeFileSync(USER_ACCESS_TOKEN, JSON.stringify({ accessToken }));
});
