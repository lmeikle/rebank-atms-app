import React from 'react';
import { shallow } from 'enzyme';
import AtmsComponent from '../AtmsComponent';

let props = {
  name: 'Barclays Bank',
  countryCode: 'UK',
  address: '10 Camden High Street',
  coords: { Latitude: 123, Longitude: 456 },
  distance: 1.23,
  numOfAtms: 3
};

const atmsComponent = shallow(<AtmsComponent {...props} />);

test('renders correctly', () => {
  expect(atmsComponent).toMatchSnapshot();
});
