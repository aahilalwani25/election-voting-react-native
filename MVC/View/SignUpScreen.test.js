import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SignUp from './SignUp';

describe('SignUp component', () => {
  test('renders all input fields correctly', () => {
    const {getByPlaceholderText} = render(<SignUp />);
    expect(getByPlaceholderText('CNIC (without dashes)')).toBeTruthy();
    expect(getByPlaceholderText('Full Name')).toBeTruthy();
    expect(
      getByPlaceholderText('Phone Number eg:03001234567 (without dashes)'),
    ).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
  });

  test('updates state when input fields change', () => {
    const {getByPlaceholderText} = render(<SignUp />);
    const cnicInput = getByPlaceholderText('CNIC (without dashes)');
    const nameInput = getByPlaceholderText('Full Name');
    const phoneInput = getByPlaceholderText(
      'Phone Number eg:03001234567 (without dashes)',
    );
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.changeText(cnicInput, '1234567890123');
    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(phoneInput, '03001234567');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.changeText(confirmPasswordInput, 'password');

    expect(cnicInput.props.value).toBe('1234567890123');
    expect(nameInput.props.value).toBe('John Doe');
    expect(phoneInput.props.value).toBe('03001234567');
    expect(passwordInput.props.value).toBe('password');
    expect(confirmPasswordInput.props.value).toBe('password');
  });

  test('triggers sign up on button press', () => {
    const signUpControllerMock = {
      signup: jest.fn().mockResolvedValue(true),
      getPhone: jest.fn().mockResolvedValue(false),
      getCNIC: jest.fn().mockResolvedValue(false),
      chehckAge: jest.fn().mockReturnValue(20),
    };
    const {getByText} = render(
      <SignUp signUpController={signUpControllerMock} />,
    );

    fireEvent.press(getByText('Sign Up'));

    expect(signUpControllerMock.signup).toHaveBeenCalled();
  });

  // Add more test cases as needed to cover different scenarios
});
