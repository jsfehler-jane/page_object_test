import { Given, When, Then } from "@wdio/cucumber-framework";
import { Login } from "../models";

const loginPage = new Login();

Given(/^I am logged in as an admin/, async () => {
  await loginPage.navigate();

  await loginPage.usernameForm.username.fill("owner");
  await loginPage.usernameForm.submit.click();

  await loginPage.passwordForm.password.fill("regallemon");
  await loginPage.passwordForm.submit.click();
});