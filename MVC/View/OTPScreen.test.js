import React from 'react';
import {shallow} from 'enzyme';
import OTPScreen from './OTPScreen';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('OTPScreen', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<OTPScreen />);
    expect(wrapper).toMatchSnapshot();
  });

  it('sets the codeInput state correctly', () => {
    const wrapper = shallow(<OTPScreen />);
    const codeInput = '123456';
    wrapper.instance().setState({codeInput});
    expect(wrapper.instance().state.codeInput).toEqual(codeInput);
  });

  // Add more test cases as needed...
});
