import calculateDistance from '../calculateDistance';

/**
 * https://mynasadata.larc.nasa.gov/latitudelongitude-finder/
 * My home: 51.536377, -0.137653
 * Buckingham Palace: 51.501364, -0.14189

 * https://www.movable-type.co.uk/scripts/latlong.html
 * Distance: 3.904 km
 */
const validData = {
  startLatitude: 51.536377,
  startLongitude: -0.137653,
  endLatitude: 51.501364,
  endLongitude: -0.14189,
  expectedResult: 3.904
};

/**
 * Strings and missing data
 */
const invalidData = {
  startLatitude: 'sdsfsdfsdf',
  endLongitude: -0.14189
};

describe('Calculate the distance between 2 sets of latitude and longitude coordinates', function() {
  test('Given 2 sets of valid coordinates return the distance', function() {
    let data = validData;
    expect(calculateDistance(data.startLatitude, data.startLongitude, data.endLatitude, data.endLongitude)).toBe(
      data.expectedResult
    );
  });

  test('Given invalid coordinates return NaN', function() {
    let data = invalidData;
    expect(
      Number.isNaN(calculateDistance(data.startLatitude, data.startLongitude, data.endLatitude, data.endLongitude))
    ).toBe(true);
  });
});
