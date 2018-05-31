import React, { Component } from 'react';
import BanksComponent from './BanksComponent';
import paticipantStoreJson from './paticipant_store.json';

/**
 * Renders the list of banks listed in the paticipant_store json that have
 * ATM capabilities
 */
class BanksContainer extends Component {
	constructor(props)
	{
		super(props);

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
				})
			}
		}

		this.state = {
			banksWithAtmAPI
		}
	}

	render()
	{
		const { banksWithAtmAPI } = this.state;

		return (
			<div>
				<div>Please select a bank</div>
				{banksWithAtmAPI.map(bank => (
					<BanksComponent key={bank.name} {...bank}/>
				))}
			</div>
		);
	}
}

export default BanksContainer;
