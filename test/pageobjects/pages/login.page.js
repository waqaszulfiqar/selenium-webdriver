const { $ } = require("@wdio/globals");
const Page = require("../page");
class LoginPage extends Page {
  open() {
    return super.open("/");
  }
  get makeAppointmentBtn() {
    return $("#btn-make-appointment");
  }
  get inputUsername() {
    return $("#txt-username");
  }
  get inputPassword() {
    return $("#txt-password");
  }
  get btnSubmit() {
    return $("#btn-login");
  }
  get getErrorMessageText() {
    return $(
      `//p[contains(text(),'Login failed! Please ensure the username and passw')]`
    );
  }
  
  async goToAppointmentPage() {
    await this.makeAppointmentBtn.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "Element not displayed",
    });
    await this.makeAppointmentBtn.click();
  }

  async login(username = "", password = "") {
    await this.inputUsername.clearValue();
    await this.inputUsername.setValue(username);
    await this.inputPassword.clearValue();
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }
}

module.exports = new LoginPage();
