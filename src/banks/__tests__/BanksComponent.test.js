import React from 'react';
import { shallow } from 'enzyme';
import BanksComponent from '../BanksComponent';

let props = {
  name: 'Barclays Bank',
  url: 'https://www.example.com'
};

const banksComponent = shallow(<BanksComponent {...props} />);

test('renders correctly', () => {
  expect(banksComponent).toMatchSnapshot();
});
