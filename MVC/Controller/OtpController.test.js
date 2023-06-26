import AsyncStorage from "@react-native-async-storage/async-storage";
import { OtpController } from "./OtpController";
import auth from "@react-native-firebase/auth";
import { render } from "react-native-testing-library";

// Mock AsyncStorage and auth
jest.mock("@react-native-async-storage/async-storage");
jest.mock("@react-native-firebase/auth");

describe("OtpController", () => {
  beforeEach(() => {
    // Reset mocks and clear AsyncStorage before each test
    AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it("should return the phone number", async () => {
    // Set up mock AsyncStorage
    AsyncStorage.getItem.mockResolvedValue("1234567890");

    // Create an instance of OtpController
    const otpController = new OtpController();

    // Call the getPhoneNumber function
    const phoneNumber = await otpController.getPhoneNumber();

    // Assert the expected result
    expect(phoneNumber).toBe("+1234567890");
  });

  it("should call signInWithPhoneNumber and set confirmResult on getOtp", async () => {
    // Set up mock AsyncStorage
    AsyncStorage.getItem.mockResolvedValue("1234567890");

    // Create a mock confirmResult
    const mockConfirmResult = {
      message: "Code has been sent",
    };

    // Set up mock signInWithPhoneNumber
    auth.signInWithPhoneNumber.mockResolvedValue(mockConfirmResult);

    // Create an instance of OtpController
    const otpController = new OtpController();

    // Call the getOtp function
    otpController.getOtp();

    // Assert that signInWithPhoneNumber is called with the correct phone number
    expect(auth.signInWithPhoneNumber).toHaveBeenCalledWith("+1234567890");

    // Assert that confirmResult and otp.message are set correctly
    expect(otpController.otp.confirmResult).toBe(mockConfirmResult);
    expect(otpController.otp.message).toBe("Code has been sent");
  });

  it("should confirm the code and return true if confirmResult is available", async () => {
    // Create a mock confirmResult
    const mockConfirmResult = {
      confirm: jest.fn(),
    };

    // Set confirmResult on otpController
    const otpController = new OtpController();
    otpController.otp.confirmResult = mockConfirmResult;

    // Call the confirmCode function
    const result = await otpController.confirmCode("123456");

    // Assert that confirm is called with the correct codeInput
    expect(mockConfirmResult.confirm).toHaveBeenCalledWith("123456");

    // Assert that the result is true
    expect(result).toBe(true);
  });

  it("should confirm the code and return false if confirmResult is not available", async () => {
    // Set confirmResult to null on otpController
    const otpController = new OtpController();
    otpController.otp.confirmResult = null;

    // Call the confirmCode function
    const result = await otpController.confirmCode("123456");

    // Assert that the result is false
    expect(result).toBe(false);
  });
});
