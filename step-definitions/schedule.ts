import { When, Then } from '@wdio/cucumber-framework';

import { Schedule } from '../models/schedule';

const schedulePage = new Schedule();

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

    const sixtyMinuteMassage = treatment[0];
    await sixtyMinuteMassage.showAvailableTimes.click();
});

When(/^I select a free slot on the schedule/, async () => {
    const staffMemberName = 'Susan Lo';

    const slots = await schedulePage.calendar.weekView.friday.getSchedule({
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
        } catch (error) {
            console.log(error);
        }
    }

    await patient.name.click();

    // Wait for Network
    await browser.pause(5000);
});

Then(/^the patient is added to the appointment/, async () => {
    const scheduledPatients = await newAppointmentPage.patient.scheduledPatients.children();
    const firstScheduledPatient = await scheduledPatients[0].name.textContent();
    assert.equal(firstScheduledPatient, 'Philippe Claire');
});
