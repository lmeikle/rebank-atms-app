import paticipantStoreJson from './paticipant_store.json';

/**
 * Gets the list of banks which have an ATM API.

 * At present this is just read from a downloaded file, as there is not an actual API request available.
 * Still written with promises in case this changes in the future.
 */
export function fetchBanksWithAtmAPIData() {
  return new Promise((resolve, reject) => {
    // we only need to do this once
    if (banksWithAtmAPI) {
      return resolve(banksWithAtmAPI);
    }

    banksWithAtmAPI = [];
    let data = paticipantStoreJson.data;
    for (let bank of data) {
      if (bank.supportedAPIs.atms) {
        banksWithAtmAPI.push({
          name: bank.name,
          url: `${bank.baseUrl}/${bank.supportedAPIs.atms[0]}/atms`
        });
      }
    }

    resolve(banksWithAtmAPI);
  });
}

let banksWithAtmAPI = null;
