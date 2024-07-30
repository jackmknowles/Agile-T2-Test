import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./BasePage";

interface JobRole {
  roleName: string;
  location: string;
  band: string;
  capability: string;
  closingDate: string;
}

export class JobRolesPage extends BasePage{

  //private url: string = 'https://5chmbvngab.eu-west-1.awsapprunner.com/job-roles';
  private url: string = "http://localhost:3000/job-roles";

  constructor() {
    super();
  }

  async open() {
    await this.driver.get(this.url);
  }

  async waitForTable() {
    await this.driver.wait(until.elementLocated(By.css("table")), 10000);
  }

  async findHeaderRow() {
    return this.driver.findElement(By.css("table tr"));
  }

  async getJobRoles(): Promise<JobRole[]> {
    this.waitForTable;

    const rows = await this.driver.findElements(By.css("table tr"));
    const jobRoles: JobRole[] = [];

    for (let i = 1; i < rows.length; i++) {
      const cols = await rows[i].findElements(By.css("td"));
      const role: JobRole = {
        roleName: await cols[0].getText(),
        location: await cols[1].getText(),
        band: await cols[2].getText(),
        capability: await cols[3].getText(),
        closingDate: await cols[4].getText(),
      };
      jobRoles.push(role);
    }

    return jobRoles;
  }

  async getInstagramButton() {
    return await this.driver.findElement(By.id("instagram-button"));
  }

  async clickInstagramButton() {
    const button = await this.getInstagramButton();
    await button.click();
  }

  async getFacebookButton() {
    return await this.driver.findElement(By.id("facebook-button"));
  }

  async clickFacebookButton() {
    const button = await this.getFacebookButton();
    await button.click();
  }

  async close() {
    await this.driver.quit();
  }
}
