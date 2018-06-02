export function fetchAtmData(url) {
  // when running locally we need to proxy the requests through our local server
  if (window.location.hostname === 'localhost') {
    url = 'api/?url=' + url;
  }

  // check if we already have the data in the cache
  if (ATM_DATA_CACHE[url]) {
    console.log('Getting data for ' + url + ' from ATM_DATA_CACHE');
    return Promise.resolve(ATM_DATA_CACHE[url]);
  }

  return fetch(url)
    .then(response => response.json())
    .then(responseJson => processATMResponse(responseJson, url))
    .catch(error => error);
}

const ATM_DATA_CACHE = {};

const processATMResponse = (response, url) => {
  if (response) {
    let brandNode = response.data[0].Brand[0];
    let brandName = brandNode.BrandName;

    // create atm data for each node just with data we actually need
    let atms = brandNode.ATM.map(atm => {
      let postalAddress = atm.Location.PostalAddress;
      return {
        identification: atm.Identification,
        name: brandName,
        countryCode: postalAddress.Country,
        address: formatAddress(postalAddress),
        coords: postalAddress.GeoLocation.GeographicCoordinates,
        numOfAtms: 1
      };
    });

    let filteredAtms = removeDuplicatesAndCountAtmsAtAdrress(atms);

    ATM_DATA_CACHE[url] = filteredAtms;

    return filteredAtms;
  }
};

const formatAddress = postalAddress => {
  let address = 'Unknown';
  if (postalAddress) {
    address = '';
    if (postalAddress.StreetName) {
      address = `${postalAddress.StreetName}, `;
    }
    address += `${postalAddress.TownName}, ${postalAddress.PostCode}`;
  }

  return address;
};

const removeDuplicatesAndCountAtmsAtAdrress = atms => {
  let seen = {};
  return atms.filter(atm => {
    if (seen.hasOwnProperty(atm.address)) {
      seen[atm.address].numOfAtms++;
      return false;
    } else {
      seen[atm.address] = atm;
      return true;
    }
  });
};
