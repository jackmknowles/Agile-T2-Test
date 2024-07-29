import { Builder, By, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { JobRolesPage } from './ViewJobRolesPage';

describe('Job Roles Page Tests', () => {
  let driver: WebDriver;
  let jobRolesPage: JobRolesPage;

  const validLocations = ['BELFAST', 'DERRY', 'LONDON']; // This can be adatped as reuired
  const validRoleNames = ['Software Engineer', 'Data Scientist', 'Cyber Security Analyst']; // This can be adatped as reuired
  const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; //this should remain as is, this is the date regex

  //before any 
  before(async () => {
    driver = new Builder().forBrowser('chrome').build();
    jobRolesPage = new JobRolesPage(driver);
  });

  after(async () => {
    await jobRolesPage.close();
  });

  it('should display a table with the correct headings', async () => {
    await jobRolesPage.open();
    // Wait for the table to be present
    await jobRolesPage.waitForTable();
    // get the header row
    const headerRow = await jobRolesPage.findHeaderRow();
    
    // Extract the text from each header cell
    const headers = await headerRow.findElements(By.css('th'));
    const headerTexts = await Promise.all(headers.map(header => header.getText()));
  
    // Expected headers
    const expectedHeaders = ['Role Name', 'Location', 'Band', 'Capability', 'Closing Date'];
  
    // Check that the actual headers match the expected headers
    expect(headerTexts).to.deep.equal(expectedHeaders, 'Table headers do not match expected headers');
  });
  

  it('should display the correct job roles information', async () => {
    await jobRolesPage.open();
    const actualJobRoles = await jobRolesPage.getJobRoles();

    actualJobRoles.forEach((role, index) => {
      expect(role.location).to.be.oneOf(validLocations, `Invalid location for role index ${index}`);
      expect(role.roleName).to.be.oneOf(validRoleNames, `Invalid role name for role index ${index}`);
      expect(role.closingDate).to.match(dateRegex, `Invalid date format for role index ${index}`);
    });
  });

  it('should have non-empty data fields for each job role', async () => {
    await jobRolesPage.open();
    const actualJobRoles = await jobRolesPage.getJobRoles();

    actualJobRoles.forEach((role) => {
      expect(role.roleName).to.not.be.empty;
      expect(role.location).to.not.be.empty;
      expect(role.band).to.not.be.empty;
      expect(role.capability).to.not.be.empty;
      expect(role.closingDate).to.not.be.empty;
    });
  });

  /*
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
  */
});
