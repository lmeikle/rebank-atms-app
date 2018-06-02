import React, { Component } from 'react';
import { fetchBanksWithAtmAPIData } from './BanksAPI';
import BanksComponent from './BanksComponent';
import LoadingComponent from '../loading/LoadingComponent';

/**
 * Renders a list of banks listed in the that have an ATM API
 */
class BanksContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banksWithAtmAPI: null
    };
  }

  componentDidMount() {
    fetchBanksWithAtmAPIData().then(banksWithAtmAPI => this.setState({ banksWithAtmAPI }));
  }

  render() {
    const { banksWithAtmAPI } = this.state;

    if (!banksWithAtmAPI) {
      return <LoadingComponent />;
    }

    return (
      <div>
        <div>Please select a bank</div>
        {banksWithAtmAPI.map(bank => <BanksComponent key={bank.name} {...bank} />)}
      </div>
    );
  }
}

export default BanksContainer;
