import { test, expect } from '@playwright/test';
import testData from '../../helpers/testData.json';
import { USER_ACCESS_TOKEN } from '../../config/auth';
import fs from 'fs';

test('Get book', async ({ request }) => {
  const response = await request.get(`https://web-api.dev.mbooks.net/api/v1/books/${testData.PaperBook}/`);
  const book = await response.json();
  expect(book.data.item).toMatchObject({
    uid: testData.PaperBook,
    title: expect.any(String),
    original_title: null,
  });
});

test('Get user', async ({ request }) => {
  const { accessToken } = JSON.parse(fs.readFileSync(USER_ACCESS_TOKEN, 'utf-8'));
  const response = await request.get('https://web-api.dev.mbooks.net/api/v1/user/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  console.log(data);
});
