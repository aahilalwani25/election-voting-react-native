import axios from 'axios';
import {SignUpController} from './SignUpController';

jest.mock('axios');

describe('SignUpController', () => {
  let signUpController;

  beforeEach(() => {
    signUpController = new SignUpController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('checkAge should calculate the correct age', () => {
    const today = new Date();
    const birthDate = new Date(
      today.getFullYear() - 25,
      today.getMonth(),
      today.getDate(),
    );
    const age = signUpController.chehckAge(
      birthDate.getDate(),
      birthDate.getMonth(),
      birthDate.getFullYear(),
    );
    expect(age).toBe(25);
  });

  test('getCNIC should return true if response has non-null CNIC', async () => {
    const mockResponse = [
      {
        Cnic: '1234567890',
      },
    ];
    axios.get.mockResolvedValueOnce({data: mockResponse});

    const result = await signUpController.getCNIC('1234567890');

    expect(axios.get).toHaveBeenCalledWith(
      `http://${ip.address}:3000/api/user/getcnic/1234567890`,
    );
    expect(result).toBe(true);
  });

  test('getCNIC should return false if response has null CNIC', async () => {
    const mockResponse = [
      {
        Cnic: null,
      },
    ];
    axios.get.mockResolvedValueOnce({data: mockResponse});

    const result = await signUpController.getCNIC('1234567890');

    expect(axios.get).toHaveBeenCalledWith(
      `http://${ip.address}:3000/api/user/getcnic/1234567890`,
    );
    expect(result).toBe(false);
  });

  // Write similar tests for other methods (getPhone, signup) in SignUpController
});
