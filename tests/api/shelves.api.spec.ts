import { test, expect } from '../../fixtures/pages';
import Authorization from '../../api/services/AuthService';
import testData from '../../helpers/testData.json';
import Shelves from '../../api/services/ShelvesService';
import { generateShelve } from '../../api/factories/shelves.factory';

test.describe('Crieted shelves', () => {
  const shelvesID: string[] = [];

  test.afterAll(async ({ request }) => {
    const authorization = new Authorization(request);
    const createdShelvew = new Shelves(request);
    const userAccess = await authorization.authorizatioWithPhoneNumber(
      `+380${testData.phoneNumber}`,
      'verify',
      testData.validOtp,
    );
    const deletedShelves = await createdShelvew.deleteddBooksShelves(userAccess, shelvesID);
    console.log(deletedShelves);
  });

  test('Crieted books shelves', async ({ request }) => {
    const authorization = new Authorization(request);
    const createdShelvew = new Shelves(request);
    const userAccess = await authorization.authorizatioWithPhoneNumber(
      `+380${testData.phoneNumber}`,
      'verify',
      testData.validOtp,
    );
    const shelvesModel = generateShelve('Test', 'Example description', true);
    const crietedShelves = await createdShelvew.crietedBooksShelves(userAccess, shelvesModel);
    expect(crietedShelves).toMatchObject({
      status: expect.any(String),
      code: 201,
      data: expect.any(Object),
    });
    shelvesID.push(crietedShelves.data.uid);
  });
});
