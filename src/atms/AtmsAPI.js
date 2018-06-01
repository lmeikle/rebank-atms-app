const AtmsAPI = {

	CORS_WORKAROUND_URL: "https://cors.io/?",

	ATM_DATA_CACHE: {},

	/**
	 * @returns {Promise}
	 */
	fetchAtmData(url)
	{
		if (AtmsAPI.ATM_DATA_CACHE[url])
		{
			console.log("Getting data for " + url + " from ATM_DATA_CACHE");
			return Promise.resolve(AtmsAPI.ATM_DATA_CACHE[url]);
		}

		// when running locally we need to proxy the requests through our local server, just using a crude check
		if (window.location.hostname === "localhost")
		{
			url = "api/?url=" + url;
		}

		return fetch(url)
			.then(response => response.json())
			.then(responseJson => AtmsAPI._processATMResponse(responseJson, url))
			.catch(error => error);
	},

	/**
	 * Process the huge amount of data and get just what we need.
	 * Store it in a cache so we dont need to request it again
	 */
	_processATMResponse(response, url)
	{
		if (response)
		{
			let brandNode = response.data[0].Brand[0];
			let brandName = brandNode.BrandName;

			// create atm data for each node just with data we actually need
			let atms = brandNode.ATM.map(atm =>
			{
				let postalAddress = atm.Location.PostalAddress;
				let geographicCoordinates = postalAddress.GeoLocation.GeographicCoordinates;

				let address = "Unknown";
				if (postalAddress)
				{
					address = "";
					if (postalAddress.StreetName)
					{
						address = `${postalAddress.StreetName}, `;
					}

					address += `${postalAddress.TownName}, ${postalAddress.PostCode}`;
				}

				return {
					identification: atm.Identification,
					name: brandName,
					countryCode: postalAddress.Country,
					address,
					geographicCoordinates,
					googleMapsUrl: `http://www.google.com/maps/place/
					${geographicCoordinates.Latitude},${geographicCoordinates.Longitude}`,
					numOfAtms: 1
				};
			});

			// filter out duplicate addresses, and keep track of the number of atm's at each address
			let seen = {};
			let filteredAtms = atms.filter(atm =>
			{
				if (seen.hasOwnProperty(atm.address))
				{
					seen[atm.address].numOfAtms++;
					return false;
				}
				else
				{
					seen[atm.address] = atm;
					return true;
				}
			});

			AtmsAPI.ATM_DATA_CACHE[url] = filteredAtms;

			return filteredAtms;
		}
	}
};

export default AtmsAPI;
