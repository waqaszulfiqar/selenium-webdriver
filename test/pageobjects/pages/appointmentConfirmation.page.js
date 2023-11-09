const { $ } = require("@wdio/globals");
const Page = require("../page");
class AppointmentConfirmationPage extends Page {
  get confirmationTitle() {
    return $(`//h2[contains(text(),'Appointment Confirmation')]`);
  }
  get facilityTitle() {
    return $("#facility");
  }
  get hospitalReadMission() {
    return $("#hospital_readmission");
  }
  get healthCareProgram() {
    return $("#program");
  }
  get visitDateConfirm() {
    return $("#visit_date");
  }
  get goToHomePageCTA() {
    return $(`//a[contains(text(),'Go to Homepage')]`);
  }
}

module.exports = new AppointmentConfirmationPage();
