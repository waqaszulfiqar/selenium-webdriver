const { $ } = require("@wdio/globals");
const Page = require("../page");

class AppointmentPage extends Page {
  getRandomFutureDate() {
    const currentDate = new Date();
    const randomDays = Math.floor(Math.random() * 365) + 1;
    currentDate.setDate(currentDate.getDate() + randomDays);
    const format = (date) =>
      date.toISOString().slice(8, 10) +
      "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getFullYear();
    return format(currentDate);
  }

  get pageTitle() {
    return $(`//h1[contains(text(),'CURA Healthcare Service')]`);
  }
  get facilityDropDown() {
    return $("#combo_facility");
  }
  get medicareRadioBtn() {
    return $("#radio_program_medicare");
  }
  get medicalAdiBtn() {
    return $("#radio_program_medicaid");
  }
  get hospitalReadmission() {
    return $(`#chk_hospotal_readmission`);
  }
  get noneBtn() {
    return $("#radio_program_none");
  }
  get visiDate() {
    return $("#txt_visit_date");
  }
  get inputCommentText() {
    return $("#txt_comment");
  }
  get bookAppointmentCTA() {
    return $(`#btn-book-appointment`);
  }
  get menuCTA() {
    return $(`#menu-toggle`);
  }
  get logOutCTA() {
    return $(`//a[contains(text(),'Logout')]`);
  }

  get historyCTA() {
    return $(`//a[contains(text(),'History')]`);
  }

  async bookAppointmentTokyoHealthCenter(randomFutureDate) {
    await this.facilityDropDown.selectByVisibleText(
      "Hongkong CURA Healthcare Center"
    );
    await this.medicareRadioBtn.click();
    await this.visiDate.setValue(randomFutureDate);
    await this.inputCommentText.setValue("This is testing appointment");
    await this.bookAppointmentCTA.click();
  }
  async logOutFun() {
    await this.menuCTA.click();
    await this.logOutCTA.click();
  }
  async goToAccountHistoryPage() {
    await this.menuCTA.click();
    await this.historyCTA.click();
  }
}

module.exports = new AppointmentPage();
