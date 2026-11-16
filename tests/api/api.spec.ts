import { test, expect } from '@playwright/test';
import testData from '../../helpers/testData.json';
import BookService from '../../api/services/BookService';
import GetUser from '../../api/services/GetUserService';
import Authorization from '../../api/services/AuthService';

test('Get book', async ({ request }) => {
  const bookService = new BookService(request);
  const books = await bookService.getAllBooks();
  expect(books.data.item).toMatchObject({
    uid: testData.PaperBook,
    title: expect.any(String),
    original_title: null,
  });
});

test('Get user with auth token', async ({ request }) => {
  const authorization = new Authorization(request);
  const getToken = await authorization.authorizatioWithPhoneNumber(
    `+380${testData.phoneNumber}`,
    'verify',
    testData.validOtp,
  );
  console.log(getToken);
  const getUser = new GetUser(request);
  const responseJson = await getUser.getUser(getToken);
  console.log(responseJson);
  expect(responseJson.code).toBe(200);
  expect(responseJson.data.item).toMatchObject({
    uid: expect.any(String),
  });
});
