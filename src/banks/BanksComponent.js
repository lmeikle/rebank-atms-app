import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import logo from './icon.svg';
import './Banks.css';

/**
 * Stateless component which renders a single Bank component.
 * Clicking on it will show a list of closest ATM's for the selected bank.
 */
const BanksComponent = ({ name, url }) => (
  <Link to={{ pathname: '/atms', state: { name, url } }}>
    <div className="BanksContainer">
      <img src={logo} className="BanksLogo" alt="logo" />
      <div>{name}</div>
    </div>
  </Link>
);

BanksComponent.propTypes = {
  name: string.isRequired,
  url: string.isRequired
};

BanksComponent.defaultProps = {};

export default BanksComponent;
