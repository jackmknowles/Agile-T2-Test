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
        roleName: 'Software Engineer',
        location: 'BELFAST',
        band: 'BAND1',
        capability: 'Engineering',
        closingDate: '2024-12-31 23:59:59'
      },
      {
        roleName: 'Data Scientist',
        location: 'DERRY',
        band: 'BAND2',
        capability: 'Data & AI',
        closingDate: '2024-11-30 23:59:59'
      }
      ,
      {
        roleName: 'Cyber Security Analyst',
        location: 'BELFAST',
        band: 'BAND1',
        capability: 'Cyber Security',
        closingDate: '2024-09-30 23:59:59'
      }
    ];

    await jobRolesPage.open();
    const actualJobRoles = await jobRolesPage.getJobRoles();

    expect(actualJobRoles).to.deep.equal(expectedJobRoles);
  });
});
