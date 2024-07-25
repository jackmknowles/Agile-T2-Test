import { Builder, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { JobRolesPage } from './ViewJobRolesPage';

describe('Job Roles Page Tests', () => {
  let driver: WebDriver;
  let jobRolesPage: JobRolesPage;

  before(async () => {
    driver = new Builder().forBrowser('chrome').build();
    jobRolesPage = new JobRolesPage(driver);
  });

  after(async () => {
    await jobRolesPage.close();
  });

  it('should display the correct job roles information', async () => {
    const expectedJobRoles = [
      {
        roleName: '',
        location: '',
        band: '',
        capability: '',
        closingDate: ''
      },
      {
        roleName: '',
        location: '',
        band: '',
        capability: '',
        closingDate: ''
      }
    ];

    await jobRolesPage.open();
    const actualJobRoles = await jobRolesPage.getJobRoles();

    expect(actualJobRoles).to.deep.equal(expectedJobRoles);
  });
});
