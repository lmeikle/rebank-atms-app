import React from 'react';
import { shallow } from 'enzyme';
import LoadingComponent from '../LoadingComponent';

const loadingComponent = shallow(<LoadingComponent />);

test('renders correctly', () => {
  expect(loadingComponent).toMatchSnapshot();
});
