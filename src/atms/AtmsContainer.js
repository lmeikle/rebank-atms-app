import React, { Component } from 'react';
import { fetchAtmData } from './AtmsAPI';
import AtmsComponent from './AtmsComponent';
import LoadingComponent from '../loading/LoadingComponent';
import calculateDistance from '../utils/calculateDistance';
import getGeolocation from '../utils/getGeolocation';

/**
 * Renders the list of nearest atms for the selected bank
 */
class AtmsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      geolocation: null,
      atms: null,
      error: null
    };
  }

  static get NEAREST_ATM_QUANTITY() {
    return 10;
  }

  componentDidMount() {
    if (this.props.location.state) {
      let { name, url } = this.props.location.state;
      if (url) {
        // reset some of the state
        this.setState({
          name,
          atms: null,
          error: null
        });

        getGeolocation()
          .then(geolocation => this.setState({ geolocation }))
          .catch(error => this.setState({ error }));

        fetchAtmData(url)
          .then(atms => this.setState({ atms }))
          .catch(error => this.setState({ error: error.toString() }));

        return;
      }
    }

    // else go the default screen
    this.props.history.replace('/');
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

  static findNearestATMs(geolocation, atms, size) {
    if (atms && geolocation) {
      let atmsWithDistance = atms.map(atm => ({
        ...atm,
        distance: calculateDistance(
          geolocation.coords.latitude,
          geolocation.coords.longitude,
          parseFloat(atm.coords.Latitude, 10),
          parseFloat(atm.coords.Longitude, 10)
        )
      }));

      atmsWithDistance.sort((a, b) => {
        if (a.distance < b.distance) return -1;
        if (a.distance > b.distance) return 1;
        return 0;
      });

      return atmsWithDistance.slice(0, size);
    }

    return null;
  }

  render() {
    const { name, geolocation, atms, error } = this.state;

    if (error) {
      return (
        <div className="errorMessage">
          Failed to find nearest {name} ATM's due to: {error.toString()}
        </div>
      );
    }

    // filter the atm data
    let nearestAtms = AtmsContainer.findNearestATMs(geolocation, atms, AtmsContainer.NEAREST_ATM_QUANTITY);
    if (!nearestAtms) {
      return <LoadingComponent />;
    }

    return (
      <div>
        <div>
          The {AtmsContainer.NEAREST_ATM_QUANTITY} nearest {name} ATM's are:
        </div>
        {nearestAtms.map(atm => <AtmsComponent key={atm.identification} {...atm} />)}
      </div>
    );
  }
}

export default AtmsContainer;
