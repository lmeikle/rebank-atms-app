import React from 'react';
import { string } from 'prop-types';
import './Atms.css';

/**
 * Stateless component which renders a single ATM component.
 * Clicking on it will launch google maps using the ATM's coordinates
 */
const AtmsComponent = ({ name, countryCode, address, coords, distance, numOfAtms }) => {
  const googleMapsUrl = `http://www.google.com/maps/place/${coords.Latitude},${coords.Longitude}`;
  return (
    <a href={googleMapsUrl} target="_blank">
      <div className="AtmContainer">
        <div>Bank Name: {name}</div>
        <div>Address: {address}</div>
        <div>Country: {countryCode}</div>
        <div>Distance: {distance.toFixed(2)}km</div>
        <div>Number of ATM's: {numOfAtms}</div>
      </div>
    </a>
  );
};

AtmsComponent.propTypes = {
  name: string.isRequired,
  countryCode: string.isRequired,
  address: string.isRequired
};

AtmsComponent.defaultProps = {};

export default AtmsComponent;
