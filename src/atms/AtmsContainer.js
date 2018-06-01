import React, { Component } from "react";
import AtmsAPI from "./AtmsAPI";
import AtmsComponent from "./AtmsComponent";
import LoadingComponent from "../loading/LoadingComponent";
import calculateDistance from '../utils/calculateDistance';
import getGeolocation from '../utils/getGeolocation';

/**
 * Renders the list of nearest atms for the selected bank
 */
class AtmsContainer extends Component {
	constructor(props)
	{
		super(props);

		this.state = {
			geolocation: null,
			atms: null,
			error: null
		};
	}

	static get NEAREST_ATM_QUANTITY()
	{
		return 10;
	}

	/**
	 * Useful info about why to make network requests in this lifecylce method
	 * https://stackoverflow.com/questions/41612200/in-react-js-should-i-make-my-initial-network-request-in-componentwillmount-or-co
	 */
	componentDidMount()
	{
		if (this.props.location.state)
		{
			let { url } = this.props.location.state;
			if (url)
			{
				// reset some of the state
				this.setState({
					atms: null,
					error: null
				});

				getGeolocation()
					.then(geolocation => this.setState({ geolocation }))
					.catch(error => this.setState({ error }));

				AtmsAPI.fetchAtmData(url)
					.then(atms => this.setState({ atms }))
					.catch(error => this.setState({ error }));

				return;
			}
		}

		// else go the default screen
		this.props.history.replace("/");
	}

	/**
	 * Commented out as there is no performance issue at present.
	 *
	 * As the filtering of ATM's to display is performed within the render function (because maybe we will
	 * update geolocation in the future or even change the filter criteria) I want to be sure to only run the
	 * update it if the state has actually changed
	 *
	shouldComponentUpdate(nextProps, nextState)
	{
		return (
			nextState.geolocation !== this.state.geolocation ||
			nextState.atms !== this.state.atms ||
			nextState.error !== this.state.error
		);
	}*/

	findNearestATMs(geolocation, atms, size)
	{
		if (atms && geolocation)
		{
			let atmsWithDistance = atms.map(atm => ({
				...atm,
				distance: calculateDistance(
					geolocation.coords.latitude,
					geolocation.coords.longitude,
					parseFloat(atm.geographicCoordinates.Latitude, 10),
					parseFloat(atm.geographicCoordinates.Longitude, 10)
				)
			}));

			atmsWithDistance.sort((a, b) =>
			{
				if (a.distance < b.distance) return -1;
				if (a.distance > b.distance) return 1;
				return 0;
			});

			return atmsWithDistance.slice(0, size);
		}

		return null;
	}

	render()
	{
		const { geolocation, atms, error } = this.state;
		let name = "";
		if (this.props.location && this.props.location.state)
		{
			name = this.props.location.state.name;
		}

		if (error)
		{
			return (
				<div>
					Failed to find nearest {name} ATM's due to: {error.toString()}
				</div>
			);
		}

		// filter the atm data, the filter requirements could be passed at props in the future if the user is given
		// the ability to change the criteria maybe
		let nearestAtms = this.findNearestATMs(geolocation, atms, AtmsContainer.NEAREST_ATM_QUANTITY);
		if (!nearestAtms)
		{
			return <LoadingComponent />;
		}

		return (
			<div>
				<div>The 10 nearest {name} ATM's are</div>
				{nearestAtms.map(atm => (
					<AtmsComponent key={atm.identification} {...atm} />
				))}
			</div>
		);
	}
}

export default AtmsContainer;
