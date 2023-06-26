import { LoginController } from './LoginController';

describe('LoginController', () => {
  test('should return true for valid login credentials', async () => {
    // Arrange
    const cnic = '5454545454';
    const password = '123';
    const expected = true;

    // Act
    const loginController = new LoginController();
    const result = await loginController.getLogin(cnic, password);

    // Assert
    expect(result).toBe(expected);
  });

  test('should return false for invalid login credentials', async () => {
    // Arrange
    const cnic = '12351451';
    const password = '123';
    const expected = false;

    // Act
    const loginController = new LoginController();
    const result = await loginController.getLogin(cnic, password);

    // Assert
    expect(result).toBe(expected);
  });
});
