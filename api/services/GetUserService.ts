import { APIRequestContext } from '@playwright/test';

export default class GetUser {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getUser(token: string) {
    const response = await this.request.get('https://web-api.dev.mbooks.net/api/v1/user/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    return responseJson;
  }
}
