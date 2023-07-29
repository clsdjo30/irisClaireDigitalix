import { getAuth } from './__mocks__/config/firebaseConfig';

jest.mock('./__mocks__/config/firebaseConfig');

test('getAuth is mocked', () => {
  getAuth();
  expect(getAuth).toHaveBeenCalled();
});