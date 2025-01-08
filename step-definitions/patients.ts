import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect, $ } from "@wdio/globals";

import { Patients } from "../models/patients";

const schedulePage = new Schedule();

When(/^I go to the Patients section/, async () => {
  const schedulePage = new Schedule();
  await schedulePage.header.patients.click();
});

When(/^I select a patient/, async () => {
  const patients = new Patients();
  const patient = await patients.patientList.getPatientByName("Emilie Chan");

  await patient.click();

  await patients.patientProfile.header.chart.click();

  await browser.pause(5000);
});
