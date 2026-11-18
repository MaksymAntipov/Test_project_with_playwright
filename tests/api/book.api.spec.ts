import { test, expect } from '@playwright/test';
import testData from '../../helpers/testData.json';
import BookService from '../../api/services/BookService';

test('Get book', async ({ request }) => {
  const bookService = new BookService(request);
  const books = await bookService.getAllBooks();
  expect(books.data.item).toMatchObject({
    uid: testData.PaperBook,
    title: expect.any(String),
    original_title: null,
  });
});
