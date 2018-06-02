import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

const app = shallow(<App />);

test('renders correctly', () => {
  expect(app).toMatchSnapshot();
});
