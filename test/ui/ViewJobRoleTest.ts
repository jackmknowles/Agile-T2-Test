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
        location: 'New York',
        band: 'Band 3',
        capability: 'Development',
        closingDate: '2024-08-01'
      },
      {
        roleName: 'Product Manager',
        location: 'San Francisco',
        band: 'Band 4',
        capability: 'Product',
        closingDate: '2024-07-31'
      }
      // Add more expected job roles here
    ];

    await jobRolesPage.open();
    const actualJobRoles = await jobRolesPage.getJobRoles();

    expect(actualJobRoles).to.deep.equal(expectedJobRoles);
  });
});
