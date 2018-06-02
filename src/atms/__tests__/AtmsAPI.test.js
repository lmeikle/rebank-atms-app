import { fetchAtmData } from '../AtmsAPI';
import mocksAtmsResponse from './mockAtmsResponse.json';

describe('testing atms api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('fetches data for a url for the first time', () => {
    fetch.mockResponseOnce(JSON.stringify(mocksAtmsResponse));

    fetchAtmData('canbeanything').then(res => {
      expect(res.length).toEqual(2021);
    });

    expect(fetch.mock.calls.length).toEqual(1);
  });

  test('fetches data for a url that has already been requested', () => {
    fetchAtmData('canbeanything').then(res => {
      expect(res.length).toEqual(2021);
    });

    // the data should be cached, so a 'fetch' should not have been made
    expect(fetch.mock.calls.length).toEqual(0);
  });

  test('handles errors', () => {
    const errorMessage = 'foo';
    fetch.mockReject(errorMessage);

    fetchAtmData('anotherurl').then(res => {
      expect(res).toEqual(errorMessage);
    });

    expect(fetch.mock.calls.length).toEqual(1);
  });
});
