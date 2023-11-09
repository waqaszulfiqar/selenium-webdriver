const { $ } = require("@wdio/globals");
const Page = require("../page");
class HistoryPage extends Page {
  get historyCTA() {
    return $(`//a[contains(text(),'History')]`);
  }
  get historyPageTitle() {
    return $(`//h2[contains(text(),'History')]`);
  }
  get bookingDate() {
    return $(".panel-heading");
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
  get visiDate() {
    return $("#txt_visit_date");
  }
  get goToHomePageCTA() {
    return $(`//a[contains(text(),'Go to Homepage')]`);
  }

  async verifyPageElements(){
    await this.historyPageTitle.isDisplayed();
    await this.facilityTitle.isDisplayed();
    await this.hospitalReadMission.isDisplayed();
    await this.goToHomePageCTA.isDisplayed();
  }
}

module.exports = new HistoryPage();
