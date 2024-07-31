import { Builder, By, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { LoginPage } from './LoginPage';
import webdriver from 'selenium-webdriver';
import { log } from 'console';


describe('LoginPage Tests', () => {
  let loginPage: LoginPage;

  before(async () => {
    loginPage = new LoginPage(); 
    await loginPage.open();
  });

  after(async () => {
    await loginPage.closeBrowser();
  });

  // vars
  let validEmail: string = "valid.admin@email.com";
  let invalidEmail: string = "invalid@gmail.com";
  let validPassword: string = "admin!Pa$$word123";
  let invalidPassword: string = "123";
  

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
    await emailField.sendKeys(invalidEmail);

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys(invalidPassword);

    await loginPage.clickSubmit();

   // const errorMessage = await loginPage.findElementById('error-message');
  //  const errorMessage = await driver.findElement(By.id('error-message')); // need to use By.id here
    // expect(await errorMessage.getText()).to.include('Login Request: Invalid Login Credentials!');
    const errorMessage = await loginPage.findElementByCss('H2');
    expect(await errorMessage.getText()).to.include('Invalid Password!');
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

     // const errorMessage = await loginPage.findElementById('error-message'); 
      const errorMessage = await loginPage.findElementByCss('H2');
     // expect(await errorMessage.getText()).to.include('Password must be at least 8 characters long.');
     expect(await errorMessage.getText()).to.include('Invalid Email Format!');
    }); 

  // password length < 8 "Password must be at least 8 characters long"
  it('should display error message if password too short', async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
   // await emailField.sendKeys('valid.admin@email.com'); // enter valid email
    //await emailField.sendKeys(validEmail);
    await loginPage.enterTextById('email',validEmail);


    const passwordField = await loginPage.password();
    await passwordField.clear();
    //await passwordField.sendKeys(invalidPassword);
    await loginPage.enterTextById('password',invalidPassword);

    await loginPage.clickSubmit();

    const errorMessage = await loginPage.findElementByCss('H2');
    //const errorMessage = await loginPage.findElementById('error-message');

   // expect(await errorMessage.getText()).to.include('Password must be at least 8 characters long.');
   expect(await errorMessage.getText()).to.include('Invalid Password!');
  });

// // check for uppercase letter
//   it('should display error message if password does not contain uppercase letter', async () => {
//       const emailField = await loginPage.email();
//       await emailField.clear();
//       await emailField.sendKeys(validEmail); // enter valid email

//       const passwordField = await loginPage.password();
//       await passwordField.clear();
//     //  await passwordField.sendKeys('abcdefgh1!');
//       await passwordField.sendKeys(invalidPassword);

//       await loginPage.clickSubmit();

//      const errorMessage = await driver.findElement(By.id('error-message'));
//      // const errorMessage = await driver.findElement(By.css('H2'));
//      // expect(await errorMessage.getText()).to.include('Password must contain at least one uppercase letter.');
//      expect(await errorMessage.getText()).to.include('Invalid Password!');
//     });

//     // check for lowercase letter
//   it('should display error message if password does not contain lowercase letter', async () => {
//     const emailField = await loginPage.email();
//     await emailField.clear();
//     await emailField.sendKeys(validEmail); // enter valid email

//     const passwordField = await loginPage.password();
//     await passwordField.clear();
//    // await passwordField.sendKeys('ABCDEFG1@');
//     await passwordField.sendKeys(invalidPassword);

//     await loginPage.clickSubmit();

//     const errorMessage = await driver.findElement(By.id('error-message'));
//     // const errorMessage = await driver.findElement(By.css('H2'));
//     // expect(await errorMessage.getText()).to.include('Password must contain at least one lowercase letter.');
//     expect(await errorMessage.getText()).to.include('Invalid Password!');
//   });

//   // check for digit
//   it('should display error message if password does not contain digit', async () => {
//     const emailField = await loginPage.email();
//     await emailField.clear();
//     await emailField.sendKeys(validEmail); // enter valid email

//     const passwordField = await loginPage.password();
//     await passwordField.clear();
//    //  await passwordField.sendKeys('abcdefgh!');
//     await passwordField.sendKeys(invalidPassword);

//     await loginPage.clickSubmit();

//      const errorMessage = await driver.findElement(By.id('error-message'));
//     //const errorMessage = await driver.findElement(By.css('H2'));
//     // expect(await errorMessage.getText()).to.include('Password must contain at least one uppercase letter.');
//     expect(await errorMessage.getText()).to.include('Invalid Password!');
//   });

//   // check for special character
//   it('should display error message if password does not contain special character', async () => {
//     const emailField = await loginPage.email();
//     await emailField.clear();
//     await emailField.sendKeys(validEmail); // enter valid email

//     const passwordField = await loginPage.password();
//     await passwordField.clear();
//     await passwordField.sendKeys(invalidPassword);
//     // await passwordField.sendKeys('abcdefgh1');

//     await loginPage.clickSubmit();

//     const errorMessage = await driver.findElement(By.id('error-message'));
//    // const errorMessage = await driver.findElement(By.css('H2'));
//     // expect(await errorMessage.getText()).to.include('Password must contain at least one special character.');
//     expect(await errorMessage.getText()).to.include('Invalid Password!');
//   });

//   // invalid email with valid password
//     it('should display error message if email is not valid', async () => {
//       const emailField = await loginPage.email();
//       await emailField.clear();
//       await emailField.sendKeys(invalidEmail); // enter valid email

//       const passwordField = await loginPage.password();
//       await passwordField.clear();
//       await passwordField.sendKeys(validPassword);

//       await loginPage.clickSubmit();

//       const errorMessage = await driver.findElement(By.id('error-message'));
//       // const errorMessage = await driver.findElement(By.css('H2'));
//       // expect(await errorMessage.getText()).to.include('Password must contain at least one special character.');
//       expect(await errorMessage.getText()).to.include('Invalid Login Credentials!');
//     });

//     // successful login
//     it('should enter email and password, then click submit', async () => {
//     const emailField = await loginPage.email();
//     await emailField.clear();
//     await emailField.sendKeys(validEmail);
//     expect(await emailField.getAttribute('value')).to.equal(validEmail);

//     const passwordField = await loginPage.password();
//     await passwordField.clear();
//     await passwordField.sendKeys(validPassword);
//     expect(await passwordField.getAttribute('value')).to.equal(validPassword);

//     await loginPage.clickSubmit();
//   });
});
 