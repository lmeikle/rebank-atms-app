import React from 'react';
import { mount, shallow } from 'enzyme';
import BanksContainer from '../BanksContainer';
import App from '../../app/App';

const initialState = {
  banksWithAtmAPI: null
};

const readyState = {
  banksWithAtmAPI: [
    {
      name: 'Barclays Bank',
      url: 'https://www.example.com'
    }
  ]
};

const banksContainer = shallow(<BanksContainer />);

describe('BanksContainer', () => {
  test('renders correctly', () => {
    expect(banksContainer).toMatchSnapshot();
  });

  test('initializes the `state` correctly', () => {
    expect(banksContainer.state()).toEqual(initialState);
  });

  test('should call methodName during componentDidMount', () => {
    const methodNameFake = jest.spyOn(BanksContainer.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(methodNameFake).toHaveBeenCalledTimes(1);
  });

  test('renders a list of BanksComponents', () => {
    banksContainer.setState(readyState);
    expect(banksContainer.find('BanksComponent').exists()).toBe(true);
  });
});
