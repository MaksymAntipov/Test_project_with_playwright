import { APIRequestContext } from '@playwright/test';

export default class Authorization {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async authorizatioWithPhoneNumber(phone: string, action: 'verify' | 'send', code?: string) {
    const response = await this.request.post(`https://web-api.dev.mbooks.net/api/v1/auth/phone/`, {
      headers: {
        'SKIP-SIGNATURE': '1',
      },
      data: {
        phone: phone,
        action,
        code: code,
      },
    });
    const responseJson = await response.json();
    return responseJson.data.access_token;
  }
}
