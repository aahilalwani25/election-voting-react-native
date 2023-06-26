import React from 'react';
import {shallow} from 'enzyme';
import VotingScreen from './VotingScreen';

describe('VotingScreen', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<VotingScreen />);
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes state correctly', () => {
    const expectedState = {
      checked: 0,
      voted: null,
    };
    expect(wrapper.state()).toEqual(expectedState);
  });

  it('renders the voting options when the user has not voted', () => {
    wrapper.setState({voted: false});
    expect(wrapper.find('Text').at(0).text()).toBe('Select a party to vote');
    expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
  });

  it('renders the already voted message when the user has voted', () => {
    wrapper.setState({voted: true});
    expect(wrapper.find('Text').at(0).text()).toBe('You have already voted');
    expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
  });

  it('updates the state when a RadioButton is pressed', () => {
    const radioButton = wrapper.find('RadioButton').at(0);
    radioButton.props().onPress();

    expect(wrapper.state().checked).toBe(1);
  });

  it('navigates to "otp" screen when submit button is pressed with a valid selection', () => {
    const navigationMock = {navigate: jest.fn()};
    wrapper.setProps({navigation: navigationMock});
    wrapper.setState({checked: 1});

    const submitButton = wrapper.find('TouchableOpacity');
    submitButton.props().onPress();

    expect(navigationMock.navigate).toHaveBeenCalledWith('otp', {party: 1});
  });

  it('shows an error alert when submit button is pressed without a valid selection', () => {
    global.alert = jest.fn();

    const submitButton = wrapper.find('TouchableOpacity');
    submitButton.props().onPress();

    expect(global.alert).toHaveBeenCalledWith(
      'ERROR',
      'You have not voted yet!!',
    );
  });

  // ... add more test cases as needed
});
