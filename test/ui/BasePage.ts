import { Builder, By, WebDriver, until } from 'selenium-webdriver';

export default class BasePage {
     public driver: WebDriver;

    constructor() {
        this.driver = new Builder().forBrowser('chrome').build();
        this.driver.manage().setTimeouts({ implicit: 10000 });
    }

    async goToUrl(url: string) {
        await this.driver.get(url);
    }

    //probably can remove these when we have all ids in
    async enterTextByCss(css: string, text: string) {
        await this.driver.findElement(By.css(css)).sendKeys(text);
    }

    async enterTextById(id: string, text: string) {
        await this.driver.findElement(By.id(id)).sendKeys(text);
    }

    async clickById(id: string) {
        await this.driver.findElement(By.id(id)).click();
    }

    //probably can remove these when we have all ids in
    async waitForElementByCss(css: string, timeout: number = 10000) {
        await this.driver.wait(until.elementLocated(By.css(css)), timeout);
    }

    async waitForElementById(id: string, timeout: number = 10000) {
        await this.driver.wait(until.elementLocated(By.id(id)), timeout);
    }

    async closeBrowser() {
        await this.driver.quit();
    }
}
