import React, { Component } from 'react';
import BanksAPI from './BanksAPI';
import BanksComponent from './BanksComponent';
import LoadingComponent from "../loading/LoadingComponent";

/**
 * Renders a list of banks listed in the that have an ATM API
 */
class BanksContainer extends Component {
	constructor(props)
	{
		super(props);

		this.state = {
			banksWithAtmAPI: null
		};
	}

	/**
	 * Useful info about why to make network requests in this lifecylce method
	 * https://stackoverflow.com/questions/41612200/in-react-js-should-i-make-my-initial-network-request-in-componentwillmount-or-co
	 */
	componentDidMount()
	{
		// get the list of banks which have an ATM API
		BanksAPI.fetchBanksWithAtmAPIData()
			.then(banksWithAtmAPI => this.setState({banksWithAtmAPI}))
	}

	render()
	{
		const { banksWithAtmAPI } = this.state;

		if (!banksWithAtmAPI)
		{
			return <LoadingComponent />;
		}

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
