const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/pages/login.page");
require("dotenv").config();
const AppointmentPage = require("../pageobjects/pages/appointment.page")
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

describe("SoraUnion - Testing & UI Automation Challenge ", () => {

  it("should redirect to Login Page and verify the page elements", async () => {
    await LoginPage.open();
    (await (LoginPage.makeAppointmentBtn)).isDisplayed();
    await expect(browser).toHaveUrl(
      "https://katalon-demo-cura.herokuapp.com/"
    );
  });

  it("should show error for empty username and password", async () => {
    await LoginPage.goToAppointmentPage();
    (await LoginPage.inputUsername).isDisplayed();
    (await LoginPage.inputPassword).isDisplayed();
    (await LoginPage.btnSubmit).isDisplayed();
    await LoginPage.login("abc", "asdas");
    expect(LoginPage.getErrorMessageText).toBeDisabled();
  });

  it("should login with valid credentials", async () => {
    await LoginPage.login(username, password);
    await expect(browser).toHaveUrl(
      "https://katalon-demo-cura.herokuapp.com/#appointment"
    );
    (await AppointmentPage.facilityDropDown).isElementDisplayed();
    (await AppointmentPage.medicareRadioBtn).isElementDisplayed();
    (await AppointmentPage.medicalAdiBtn).isElementDisplayed();
    (await AppointmentPage.noneBtn).isElementDisplayed();
  });
  it("should LogOut from the system ", async () => {
   await AppointmentPage.logOutFun();
   (await (LoginPage.makeAppointmentBtn)).isDisplayed();
    await expect(browser).toHaveUrl(
      "https://katalon-demo-cura.herokuapp.com/"
    );
  });
});
