import { APIRequestContext } from '@playwright/test';
import testData from '../testData.json';

export default class getAllBooks {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAllBooks() {
    const response = await this.request.get(`https://web-api.dev.mbooks.net/api/v1/books/${testData.PaperBook}/`);
    const responseJson = await response.json();
    return responseJson;
  }
}
