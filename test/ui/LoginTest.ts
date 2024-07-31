import { Builder, By, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { LoginPage } from './LoginPage';
import webdriver from 'selenium-webdriver';


describe('LoginPage Tests', () => {
  let driver: WebDriver;
  let loginPage: LoginPage;

  before(async () => {
    driver = new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(driver);
    await driver.get('http://localhost:3000/loginform');
   // await driver.get('https://5chmbvngab.eu-west-1.awsapprunner.com/job-roles'); 
  });

  after(async () => {
    await driver.quit();
  });

  //let validEmail string = "Hello, World!";
// console.log(myVariable);


  it('should find the email input field', async () => {
    const emailField = await loginPage.email();
    expect(emailField).to.not.be.null;
    expect(await emailField.getAttribute('name')).to.equal('email');
  });

  it('should find the password input field', async () => {
    const passwordField = await loginPage.password();
    expect(passwordField).to.not.be.null;
    expect(await passwordField.getAttribute('id')).to.equal('password');
  });

  it('should find the submit button', async () => {
    const submitButton = await loginPage.submit();
    expect(submitButton).to.not.be.null;
    expect(await submitButton.getAttribute('class')).to.include('login-button');
  });

  // wrong email and password
  it('should display error message when wrong email and password entered', async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await emailField.sendKeys('invalid@example.com');

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys('WrongPassword1!');

    await loginPage.clickSubmit();

    const errorMessage = await driver.findElement(By.id('error-message')); // need to use By.id here
    expect(await errorMessage.getText()).to.include('Login Request: Invalid Login Credentials!');
  });

  // no login details entered; click Submit button
    it('should display error message when no email or password entered', async () => {
      const emailField = await loginPage.email();
      await emailField.clear();
      await emailField.sendKeys(''); 

      const passwordField = await loginPage.password();
      await passwordField.clear();
      await passwordField.sendKeys('');

      await loginPage.clickSubmit();

      const errorMessage = await driver.findElement(By.id('error-message')); 
     // const errorMessage = await driver.findElement(By.css('H2'));
     // expect(await errorMessage.getText()).to.include('Password must be at least 8 characters long.');
     expect(await errorMessage.getText()).to.include('Invalid Email Format!');
    }); 

  // password length < 8 "Password must be at least 8 characters long"
  it('should display error message if password too short', async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await emailField.sendKeys('valid.admin@email.com'); // enter valid email

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys('1234567');

    await loginPage.clickSubmit();

    const errorMessage = await driver.findElement(By.id('error-message')); 
   //  const errorMessage = await driver.findElement(By.css('H2'));
   // expect(await errorMessage.getText()).to.include('Password must be at least 8 characters long.');
   expect(await errorMessage.getText()).to.include('Invalid Password!');
  });

// check for uppercase letter
  it('should display error message if password does not contain uppercase letter', async () => {
      const emailField = await loginPage.email();
      await emailField.clear();
      await emailField.sendKeys('valid.admin@email.com'); // enter valid email

      const passwordField = await loginPage.password();
      await passwordField.clear();
      await passwordField.sendKeys('abcdefgh1!');

      await loginPage.clickSubmit();

     const errorMessage = await driver.findElement(By.id('error-message'));
     // const errorMessage = await driver.findElement(By.css('H2'));
     // expect(await errorMessage.getText()).to.include('Password must contain at least one uppercase letter.');
     expect(await errorMessage.getText()).to.include('Invalid Password!');
    });

    // check for lowercase letter
  it('should display error message if password does not contain lowercase letter', async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await emailField.sendKeys('valid.admin@email.com'); // enter valid email

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys('ABCDEFG1@');

    await loginPage.clickSubmit();

    const errorMessage = await driver.findElement(By.id('error-message'));
    // const errorMessage = await driver.findElement(By.css('H2'));
    // expect(await errorMessage.getText()).to.include('Password must contain at least one lowercase letter.');
    expect(await errorMessage.getText()).to.include('Invalid Password!');
  });

  // check for digit
  it('should display error message if password does not contain digit', async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await emailField.sendKeys('valid.admin@email.com'); // enter valid email

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys('abcdefgh!');

    await loginPage.clickSubmit();

     const errorMessage = await driver.findElement(By.id('error-message'));
    //const errorMessage = await driver.findElement(By.css('H2'));
    // expect(await errorMessage.getText()).to.include('Password must contain at least one uppercase letter.');
    expect(await errorMessage.getText()).to.include('Invalid Password!');
  });

  // check for special character
  it('should display error message if password does not contain special character', async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await emailField.sendKeys('valid.admin@email.com'); // enter valid email

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys('abcdefgh1');

    await loginPage.clickSubmit();

    const errorMessage = await driver.findElement(By.id('error-message'));
   // const errorMessage = await driver.findElement(By.css('H2'));
    // expect(await errorMessage.getText()).to.include('Password must contain at least one special character.');
    expect(await errorMessage.getText()).to.include('Invalid Password!');
  });

  // invalid email with valid password
    it('should display error message if email is not valid', async () => {
      const emailField = await loginPage.email();
      await emailField.clear();
      await emailField.sendKeys('invalid.admin@email.com'); // enter valid email

      const passwordField = await loginPage.password();
      await passwordField.clear();
      await passwordField.sendKeys('admin!Pa$$word123');

      await loginPage.clickSubmit();

      const errorMessage = await driver.findElement(By.id('error-message'));
      // const errorMessage = await driver.findElement(By.css('H2'));
      // expect(await errorMessage.getText()).to.include('Password must contain at least one special character.');
      expect(await errorMessage.getText()).to.include('Invalid Login Credentials!');
    });

    // successful login
    it('should enter email and password, then click submit', async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await emailField.sendKeys('valid.admin@email.com');
    expect(await emailField.getAttribute('value')).to.equal('valid.admin@email.com');

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys('admin!Pa$$word123');
    expect(await passwordField.getAttribute('value')).to.equal('admin!Pa$$word123');

    await loginPage.clickSubmit();
  });
});
 