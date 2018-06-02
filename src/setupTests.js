/*****************************************************************
 * Fix Enzyme Adapter with react 16
 *****************************************************************/
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

/*****************************************************************
 * fetch
 *****************************************************************/
import fetch from 'jest-fetch-mock';
global.fetch = fetch;

/*****************************************************************
 * Mock geolocation
 *****************************************************************/
const mockGeolocation = {
  getCurrentPosition: jest.fn(cb => cb({ coords: { latitude: 123, longitude: 456 } })),
  watchPosition: jest.fn()
};

navigator.geolocation = mockGeolocation;
