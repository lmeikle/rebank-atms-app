import paticipantStoreJson from './paticipant_store.json';

const BanksAPI = {

	/**
	 * At present this is just read from a downloaded file, as there is not an actual API request available.
	 * Still written with promises in case this changes in the future.
	 *
	 * @returns {Promise}
	 */
	fetchBanksWithAtmAPIData()
	{
		return new Promise((resolve, reject) => {
			// get the list of banks which have an ATM API
			let banksWithAtmAPI = [];
			let data = paticipantStoreJson.data;
			for (let bank of data)
			{
				if (bank.supportedAPIs.atms)
				{
					banksWithAtmAPI.push({
						name: bank.name,
						url: `${bank.baseUrl}/${bank.supportedAPIs.atms[0]}/atms`
					});
				}
			}

			/**
			 * https://openapi.bankofireland.com/open-banking/v2.1/atms
			 BanksAPI.js:26 https://api.bankofscotland.co.uk/open-banking/v2.1/atms
			 BanksAPI.js:26 https://atlas.api.barclays/open-banking/v2.1/atms
			 BanksAPI.js:26 https://obp-data.danskebank.com/open-banking/v2.1/atms
			 BanksAPI.js:26 https://openapi.firsttrustbank.co.uk/open-banking/v2.1/atms
			 BanksAPI.js:26 https://api.halifax.co.uk/open-banking/v2.1/atms
			 BanksAPI.js:26 https://api.hsbc.com/open-banking/v2.1/atms
			 BanksAPI.js:26 https://api.lloydsbank.com/open-banking/v2.1/atms
			 BanksAPI.js:26 https://openapi.nationwide.co.uk/open-banking/v2.1/atms
			 BanksAPI.js:26 https://openapi.natwest.com/open-banking/v2.1/atms
			 BanksAPI.js:26 https://openapi.rbs.co.uk/open-banking/v2.1/atms
			 BanksAPI.js:26 https://openbanking.santander.co.uk/sanuk/external/open-banking/v2.1/atms
			 BanksAPI.js:26 https://openapi.ulsterbank.co.uk/open-banking/v2.1/atms
			 */

			resolve(banksWithAtmAPI)
		})
	}
};

export default BanksAPI;
