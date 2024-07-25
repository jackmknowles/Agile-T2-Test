import { By, WebDriver, until } from 'selenium-webdriver';
  
interface JobRole {
    roleName: string;
    location: string;
    band: string;
    capability: string;
    closingDate: string;
  }
  
  export class JobRolesPage {
    private driver: WebDriver;
    private url: string = 'https://localhost/3000/job-roles';
  
    constructor(driver: WebDriver) {
      this.driver = driver;
    }
  
    async open() {
      await this.driver.get(this.url);
    }
  
    async getJobRoles(): Promise<JobRole[]> {
      await this.driver.wait(until.elementLocated(By.tagName('table')), 10000);
  
      const rows = await this.driver.findElements(By.css('table tr'));
      const jobRoles: JobRole[] = [];
  
      for (let i = 1; i < rows.length; i++) { // Skip header row
        const cols = await rows[i].findElements(By.tagName('td'));
        const role: JobRole = {
          roleName: await cols[0].getText(),
          location: await cols[1].getText(),
          band: await cols[2].getText(),
          capability: await cols[3].getText(),
          closingDate: await cols[4].getText()
        };
        jobRoles.push(role);
      }
  
      return jobRoles;
    }
  
    async close() {
      await this.driver.quit();
    }
  }
  