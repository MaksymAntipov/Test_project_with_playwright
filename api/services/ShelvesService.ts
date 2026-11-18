import { APIRequestContext } from '@playwright/test';

export default class Shelves {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async crietedBooksShelves(token: string, shelves: object) {
    const crietedShelves = await this.request.post('https://web-api.dev.mbooks.net/api/v1/shelves/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: shelves,
    });
    const responseJson = await crietedShelves.json();
    return responseJson;
  }

  async deleteddBooksShelves(token: string, shelves: object) {
    const crietedShelves = await this.request.delete('https://web-api.dev.mbooks.net/api/v1/shelves/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        shelf_uids: shelves,
      },
    });
    const responseJson = await crietedShelves.json();
    return responseJson;
  }
}
