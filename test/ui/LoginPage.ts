import { By, WebDriver, WebElement } from 'selenium-webdriver';
import BasePage from './BasePage';


export class LoginPage extends BasePage{
  
  private url: string = "http://localhost:3000/loginform";

  
  constructor() {
   super();
   this.url;
  }

  async open() {
    await super.open(this.url);
  }

  // WebElements ---------------------------------------------------------------
 // async email(): Promise<WebElement> {
  //  return await this.driver.findElement(By.id('email'));
 // }

  async email() {
    return await this.findElementById('email');
  }

  async password() {
    return await this.findElementById('password');
  }

  async submit() {
    return await this.findElementById('submit');
  }

  async clickSubmit() {
    await this.clickById('submit');
  }
}
 