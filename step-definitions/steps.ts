import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import { Login } from '../models';
import { Schedule } from '../models/schedule';
import { Patients } from '../models/patients';

const loginPage = new Login();
const schedulePage = new Schedule();


Given(/^I am logged in as an admin/, async () => {
    await loginPage.navigate();

    await loginPage.usernameForm.username.fill('owner');
    await loginPage.usernameForm.submit.click();

    await loginPage.passwordForm.password.fill('wiseshark');
    await loginPage.passwordForm.submit.click();
});


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


When(/^I select a Treatment for a staff member/, async () => {
  await schedulePage.header.schedule.click();
  await schedulePage.calendarControls.weekView.click();

  const staffMemberName = 'Susan Lo';

  const staffMember = await schedulePage.staffFilter.getStaffByName(staffMemberName);

  // In a real test we should know the state of the app.
  const isActive = await staffMember.isActive();
  if (!isActive) {
      await staffMember.container.parentElement.click();
  }

  await staffMember.toolbar.toggleTreatments.click();

  const treatments = await staffMember.treatments.children();
  const treatment = await treatments.containing('title', '60 Minute Massage');

  const treatment_0 = treatment[0];
  await treatment_0.showAvailableTimes.click();
});


When(/^I select a free slot on the schedule/, async () => {
  const slots = await schedulePage.calendar.weekView.thursday.getSchedule({
      discipline: 'Massage Therapy',
      staff: staffMemberName,
  });

  let slotToUse = null;
  for (const slot of slots) {
      const txt = await slot.details.textContent();
      if (txt.length === 0) {
          slotToUse = slot;
          break;
      }
  }

  await slotToUse.showAppointment.click();
});


When(/^I add a patient to the appointment slot/, async () => {
  const newAppointmentPage = new NewAppointment();
  await newAppointmentPage.patient.addPatient.fill('Philippe Claire');

  // Wait for network
  await browser.pause(5000);

  const c = await newAppointmentPage.patient.patientSearchResults.children();

  let patient = null;

  // Ensure the correct patient is selected.
  for (const result of c) {
      try {
          await result.name.textContent();
          patient = result;
          break;
      } catch (error) {}
  }

  await patient.name.click();

  // Wait for Network
  await browser.pause(5000);


});

Then(/^the patient is added to the appointment/, async () => {
  const scheduledPatients =
      await newAppointmentPage.patient.scheduledPatients.children();
  const firstScheduledPatient = await scheduledPatients[0].name.textContent();
  assert.equal(firstScheduledPatient, 'Philippe Claire');
});
