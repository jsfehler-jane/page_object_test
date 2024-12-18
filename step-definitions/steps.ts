import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import { Login } from '../models';

const loginPage = new Login();

Given(/^I am on the (\w+) page$/, async (page) => {
    await loginPage.navigate();
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
  await loginPage.usernameForm.username.fill('owner');
  await loginPage.usernameForm.submit.click();

  await loginPage.passwordForm.password.fill('retrocarpet');
  await loginPage.passwordForm.submit.click();
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining(message));
});
