require("dotenv").config();
const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/pages/login.page");
const AppointmentPage = require("../pageobjects/pages/appointment.page");
const ApptConfirmationPage = require("../pageobjects/pages/appointmentConfirmation.page");
const HistoryPage = require("../pageobjects/pages/history.page");

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

describe("BOOK APPOINTMENT", () => {
  it("should redirect to Login Page and verify the page elements", async () => {
    await LoginPage.open();
    await expect(LoginPage.makeAppointmentBtn).toBeDisplayed();
    await expect(browser).toHaveUrl("https://katalon-demo-cura.herokuapp.com/");
  });

  it("should login with valid credentials", async () => {
    await LoginPage.goToAppointmentPage();
    await LoginPage.login(username, password);
    await expect(browser).toHaveUrl(
      "https://katalon-demo-cura.herokuapp.com/#appointment"
    );
    await expect(AppointmentPage.facilityDropDown).toBeDisplayed();
    await expect(AppointmentPage.medicareRadioBtn).toBeDisplayed();
    await expect(AppointmentPage.medicalAdiBtn).toBeDisplayed();
    await expect(AppointmentPage.noneBtn).toBeDisplayed();
  });

  it("should book an appointment", async () => {
    const randomFutureDate = AppointmentPage.getRandomFutureDate();
    await AppointmentPage.bookAppointmentTokyoHealthCenter(randomFutureDate);
    await browser.pause(2000);
    await expect(ApptConfirmationPage.confirmationTitle).toBeDisplayed();
    const facility = await ApptConfirmationPage.facilityTitle.getText();
    expect(facility).toContain("Hongkong CURA Healthcare Center");
    const program = await ApptConfirmationPage.healthCareProgram.getText();
    expect(program).toContain("Medicare");

    const date = await ApptConfirmationPage.visitDateConfirm.getText();
    console.log(date);
    console.log(randomFutureDate);
    expect(date).toContain(randomFutureDate);
  });

  it("should verify the Appointment in the Account History", async () => {
    await AppointmentPage.goToAccountHistoryPage();
    await HistoryPage.verifyPageElements();
    const historyFacility = await HistoryPage.facilityTitle.getText();
    expect(historyFacility).toContain("Hongkong CURA Healthcare Center");
    const historyProgram = await HistoryPage.healthCareProgram.getText();
    expect(historyProgram).toContain("Medicare");
  });
});
