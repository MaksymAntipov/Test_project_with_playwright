import { API_TOKENS } from '../../config/auth';
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
  expect(response.status()).toBe(200);
  const responseJson = await response.json();
  const accessToken = responseJson.data.access_token;
  const refreshToken = responseJson.data.refresh_token;
  const state = {
    cookies: [
      {
        name: '__mb_at',
        value: accessToken,
        domain: 'web.dev.mbooks.net',
        path: '/',
        expires: -1,
        httpOnly: false,
        secure: true,
        sameSite: 'Lax' as const,
      },
      {
        name: '__mb_rt',
        value: refreshToken,
        domain: 'web.dev.mbooks.net',
        path: '/',
        expires: -1,
        httpOnly: false,
        secure: true,
        sameSite: 'Lax' as const,
      },
    ],
    origins: [],
  };
  fs.writeFileSync(API_TOKENS, JSON.stringify(state));
});
