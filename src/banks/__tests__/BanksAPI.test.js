import { fetchBanksWithAtmAPIData } from '../BanksAPI';
import mockBanksResponse from '../paticipant_store.json';

describe('testing banks api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('fetches data the first time', () => {
    fetch.mockResponseOnce(JSON.stringify(mockBanksResponse));

    fetchBanksWithAtmAPIData().then(res => {
      expect(res.length).toEqual(13);
    });

    // does not actually make a fetch at present
    expect(fetch.mock.calls.length).toEqual(0);
  });

  test('fetches data that has already been requested', () => {
    fetchBanksWithAtmAPIData().then(res => {
      expect(res.length).toEqual(13);
    });

    // the data should be cached, so a 'fetch' should not have been made
    expect(fetch.mock.calls.length).toEqual(0);
  });
});
