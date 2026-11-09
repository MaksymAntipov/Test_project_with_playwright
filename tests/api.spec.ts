import { test, expect } from '@playwright/test';
import testData from '../helpers/testData.json';

test('Get book', async ({ request }) => {
  const response = await request.get(`https://web-api.dev.mbooks.net/api/v1/books/${testData.PaperBook}/`);
  const book = await response.json();
  console.log(book);
});
