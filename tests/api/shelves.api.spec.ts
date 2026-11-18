import { test, expect } from '../../fixtures/pages';
import Authorization from '../../api/services/AuthService';
import testData from '../../helpers/testData.json';

test('Crieted books shelves', async ({ request }) => {
  const authorization = new Authorization(request);
  const userAccess = await authorization.authorizatioWithPhoneNumber(
    `+380${testData.phoneNumber}`,
    'verify',
    testData.validOtp,
  );
  console.log(userAccess);
});
