import { By, WebDriver, until } from 'selenium-webdriver';

export class LoginPage {
  private driver: WebDriver;
  private url: string = 'https://localhost/3000';

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get(this.url);
  }

  async setUsername(username: string) {
    const usernameField = await this.driver.findElement(By.name('username'));
    await usernameField.sendKeys(username);
  }

  async setPassword(password: string) {
    const passwordField = await this.driver.findElement(By.name('password'));
    await passwordField.sendKeys(password);
  }

  async submitLogin() {
    const loginButton = await this.driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.driver.wait(until.elementLocated(By.id('error-message')), 5000);
    const errorMessage = await this.driver.findElement(By.id('error-message'));
    return await errorMessage.getText();
  }

  async close() {
    await this.driver.quit();
  }
}

