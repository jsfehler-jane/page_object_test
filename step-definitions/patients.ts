import { When } from '@wdio/cucumber-framework';

import { Schedule } from '../models/schedule';

import { Patients } from '../models/patients';

When(/^I go to the Patients section/, async () => {
    const schedulePage = new Schedule();
    await schedulePage.header.patients.click();
});

When(/^I select a patient/, async () => {
    const patients = new Patients();
    const patient = await patients.patientList.getPatientByName('Emilie Chan');

    await patient.click();

    await patients.patientProfile.header.chart.click();

    await browser.pause(5000);
});
