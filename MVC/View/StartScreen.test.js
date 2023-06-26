import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import React from 'react';
import {shallow} from 'enzyme';
import StartScreen from './StartScreen';

describe('StartScreen', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<StartScreen />);
    expect(wrapper).toMatchSnapshot();
  });

  test('navigates to signup screen when Sign Up button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const wrapper = shallow(<StartScreen navigation={navigationMock} />);
    wrapper.find('TouchableOpacity').at(0).simulate('press');
    expect(navigationMock.navigate).toHaveBeenCalledWith('signup');
  });

  test('navigates to login screen when Log In button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const wrapper = shallow(<StartScreen navigation={navigationMock} />);
    wrapper.find('TouchableOpacity').at(1).simulate('press');
    expect(navigationMock.navigate).toHaveBeenCalledWith('login');
  });
});
