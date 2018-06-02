import React from 'react';
import { mount, shallow } from 'enzyme';
import AtmsContainer from '../AtmsContainer';
import App from '../../app/App';

const props = {
  location: {
    state: {
      name: 'Barclays Bank',
      url: 'www.example.com'
    }
  },
  history: ''
};

const initialState = {
  geolocation: null,
  atms: null,
  error: null
};

const readyState = {
  geolocation: { coords: { latitude: 123, longitude: 456 } },
  atms: [
    {
      identification: '456',
      name: 'Barclays Bank',
      countryCode: 'UK',
      address: '10 Watford High Street',
      coords: { Latitude: 234, Longitude: 567 },
      distance: 5.23,
      numOfAtms: 1
    },
    {
      identification: '123',
      name: 'Barclays Bank',
      countryCode: 'UK',
      address: '10 Camden High Street',
      coords: { Latitude: 123, Longitude: 456 },
      distance: 1.23,
      numOfAtms: 3
    },
    {
      identification: '789',
      name: 'Barclays Bank',
      countryCode: 'UK',
      address: '10 Chesham High Street',
      coords: { Latitude: 345, Longitude: 567 },
      distance: 10.23,
      numOfAtms: 1
    }
  ],
  error: null
};

const errorState = {
  geolocation: { coords: { latitude: 123, longitude: 456 } },
  atms: null,
  error: 'There was an error'
};

const atmsContainer = shallow(<AtmsContainer {...props} />);

describe('AtmsContainer', () => {
  test('renders correctly', () => {
    expect(atmsContainer).toMatchSnapshot();
  });

  test('initializes the `state` correctly', () => {
    expect(atmsContainer.state()).toEqual(initialState);
  });

  test('renders a list of AtmsComponents', () => {
    atmsContainer.setState(readyState);
    expect(atmsContainer.find('AtmsComponent').exists()).toBe(true);
  });

  test('given an arrry of atms find the nearest atms', () => {
    expect(AtmsContainer.findNearestATMs(readyState.geolocation, readyState.atms, 1)[0].address).toBe(
      '10 Camden High Street'
    );
  });

  test('displays a error message', () => {
    atmsContainer.setState(errorState);
    expect(atmsContainer.find('.errorMessage').exists()).toBe(true);
  });
});
