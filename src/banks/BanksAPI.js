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

			resolve(banksWithAtmAPI)
		})
	}
};

export default BanksAPI;
