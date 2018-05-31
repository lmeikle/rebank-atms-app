import React, { Component } from "react";
import AtmsComponent from "./AtmsComponent";
import LoadngComponent from "../loading/LoadingComponent";

/**
 * Renders the list of nearest atms for the selected bank
 */
class AtmsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      geolocation: null,
      atms: null,
      error: null
    };
  }

  componentWillMount() {
    if (this.props.location.state) {
      let { url } = this.props.location.state;
      if (url) {
        // kick off getting the geolocation and making the API request at the same time
        // just done once at present, but we could track changes
        if (!this.state.geolocation) {
          navigator.geolocation.getCurrentPosition(this._processGeolocation);
        }

        // reset some of the state
        // potentially cache the results per bank
        this.setState({
          atms: null,
          error: null
        });

        fetch(url)
          .then(response => response.json())
          .then(data => this._processResponse(data))
          .catch(e => {
            // many of the banks give a CORS error
            // the below is a 'quick' temporary workaround
            // just proxy the request through https://cors.io - but this only works
            // with XMLHttpRequest! not fetch
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.responseText) {
                  this._processResponse(JSON.parse(xhr.responseText));
                } else {
                  this.setState({
                    error: e
                  });
                }
              }
            };
            xhr.open("GET", "https://cors.io/?" + url, true);
            xhr.send(null);
          });

        return;
      }
    }

    // else go the default screen
    this.props.history.replace("/");
  }

  shouldComponentUpdate(nextProps, nextState) {
    // as the filtering of ATM's to display is performed within the render function
    // (in case I want to update the result as my geolocation changes)
    // so be sure to only run it if the state has actually changed
    return (
      nextState.geolocation !== this.state.geolocation ||
      nextState.atms !== this.state.atms ||
      nextState.error !== this.state.error
    );
  }

  _processGeolocation = geolocation => {
    // geolocation stored in the state, so we could potentially track changes in it and update the results accordingly
    this.setState({
      geolocation
    });
  };

  _processResponse = data => {
    if (data) {
      let brandNode = data.data[0].Brand[0];
      let brandName = brandNode.BrandName;
      let atmsArr = brandNode.ATM;

      // create a atm data for each entry just with data we actually need
      let atms = atmsArr.map(atm => {
        let postalAddress = atm.Location.PostalAddress;
        let geographicCoordinates = postalAddress.GeoLocation.GeographicCoordinates;

        let address = "Unknown";
        if (postalAddress) {
          address = `${postalAddress.StreetName}, ${postalAddress.TownName}, ${postalAddress.PostCode}`;
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

      // filter out duplicate addresses, and keep track of the number of atm's
      // at each address
      let seen = {};
      let atmsWithoutDuplicates = atms.filter(atm => {
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

      this.setState({
        atms: atmsWithoutDuplicates
      });
    }
  };

  static _findNearestATMs(geolocation, atms, size) {
    if (atms && geolocation) {
      let atmsWithDistance = atms.map(atm => ({
        ...atm,
        distance: AtmsContainer._calculateDistance(
          geolocation.coords.latitude,
          geolocation.coords.longitude,
          parseFloat(atm.geographicCoordinates.Latitude, 10),
          parseFloat(atm.geographicCoordinates.Longitude, 10)
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

  /**
   * Taken from
   * https://www.html5rocks.com/en/tutorials/geolocation/trip_meter/
   */
  static _calculateDistance(lat1, lon1, lat2, lon2) {
    function toRad(n) {
      return n * Math.PI / 180;
    }

    let R = 6371; // km
    let dLat = toRad(lat2 - lat1);
    let dLon = toRad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }

  render() {
    const { geolocation, atms, error } = this.state;
    let name = "";
    if (this.props.location && this.props.location.state) {
      name = this.props.location.state.name;
    }

    if (error) {
      return (
        <div>
          Failed to get nearest {name} ATM's due to {error.toString()}
        </div>
      );
    }

    let nearestAtms = AtmsContainer._findNearestATMs(geolocation, atms, 10);
    if (!nearestAtms) {
      return <LoadngComponent />;
    }
		console.log(atms);
    console.log(nearestAtms);
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
