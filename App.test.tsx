import { getAuth } from './__mocks__/firebaseConfig';

jest.mock('./__mocks__/firebaseConfig');

test('getAuth is mocked', () => {
  getAuth();
  expect(getAuth).toHaveBeenCalled();
});