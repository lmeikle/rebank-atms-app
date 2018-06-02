import getGeolocation from '../getGeolocation';

let geolocationResult = { coords: { latitude: 123, longitude: 456 } };

describe('Geolocation', function() {
  test('get the geolocation', function() {
    expect.assertions(1);
    return getGeolocation().then(data => expect(data).toEqual(geolocationResult));
  });

  test('an error message is returned if not supported', function() {
    navigator.geolocation = null;
    expect.assertions(1);
    return getGeolocation().catch(error => expect(error).toBe('Geolocation not supported'));
  });
});
