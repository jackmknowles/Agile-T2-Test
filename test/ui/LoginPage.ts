import { By, WebDriver, WebElement } from 'selenium-webdriver';

export class LoginPage {
  private driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  // WebElements ---------------------------------------------------------------
  async email(): Promise<WebElement> {
    return await this.driver.findElement(By.id('email'));
  }

  async password(): Promise<WebElement> {
    return await this.driver.findElement(By.id('password'));
  }

  async submit(): Promise<WebElement> {
    return await this.driver.findElement(By.id('submit'));
  }
  //-------------------------------------------------------------------------------

  // Click on continue ------------------------------------------------------------
  async clickSubmit() {
    const submitButton = await this.submit();
    await submitButton.click();
  }
}
 