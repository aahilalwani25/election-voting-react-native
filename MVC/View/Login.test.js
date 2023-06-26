import React from 'react';
import {shallow} from 'enzyme';
import LoginScreen from './LoginScreen';
import {LoginController} from '../Controller/LoginController';

describe('LoginScreen', () => {
  let wrapper;
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = {navigate: jest.fn()};
    wrapper = shallow(<LoginScreen navigation={mockNavigation} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('updates cnic state when CNIC input changes', () => {
    const cnicInput = wrapper.findWhere(
      node => node.prop('placeholder') === 'CNIC',
    );
    const mockCnic = '1234567890';

    cnicInput.simulate('changeText', mockCnic);

    expect(wrapper.state('cnic')).toEqual(mockCnic);
  });

  it('updates password state when Password input changes', () => {
    const passwordInput = wrapper.findWhere(
      node => node.prop('placeholder') === 'Password',
    );
    const mockPassword = 'password123';

    passwordInput.simulate('changeText', mockPassword);

    expect(wrapper.state('password')).toEqual(mockPassword);
  });

  it('calls getLogin method of LoginController on button press', () => {
    const mockGetLogin = jest.fn().mockResolvedValue(true);
    wrapper.instance().login.getLogin = mockGetLogin;

    const button = wrapper.findWhere(
      node => node.prop('testID') === 'loginButton',
    );
    button.simulate('press');

    expect(mockGetLogin).toHaveBeenCalledWith(
      wrapper.state('cnic'),
      wrapper.state('password'),
    );
  });

  it('navigates to dashboard screen on successful login', async () => {
    const mockGetLogin = jest.fn().mockResolvedValue(true);
    wrapper.instance().login.getLogin = mockGetLogin;

    const button = wrapper.findWhere(
      node => node.prop('testID') === 'loginButton',
    );
    await button.simulate('press');

    expect(mockNavigation.navigate).toHaveBeenCalledWith('dashboard');
  });

  it('shows an alert on unsuccessful login', async () => {
    const mockGetLogin = jest.fn().mockResolvedValue(false);
    wrapper.instance().login.getLogin = mockGetLogin;

    const button = wrapper.findWhere(
      node => node.prop('testID') === 'loginButton',
    );
    await button.simulate('press');

    expect(Alert.alert).toHaveBeenCalledWith(
      'ERROR',
      'Either CNIC or password is wrong',
    );
  });

  // Add more test cases as needed
});
