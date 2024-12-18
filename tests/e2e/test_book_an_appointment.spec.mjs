import { strict as assert } from 'assert';

import { Login } from '../../pages';
import { Schedule, NewAppointment } from '../../pages/schedule';

describe('Schedule', function () {
    describe('Book an Appointment', function () {
        it('works as designed', async function () {
            const loginPage = new Login();
            await loginPage.navigate();

            await loginPage.usernameForm.username.fill('owner');
            await loginPage.usernameForm.submit.click();

            await loginPage.passwordForm.password.fill('retrocarpet');
            await loginPage.passwordForm.submit.click();

            const schedulePage = new Schedule();
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

            const scheduledPatients =
                await newAppointmentPage.patient.scheduledPatients.children();
            const firstScheduledPatient = await scheduledPatients[0].name.textContent();

            assert.equal(firstScheduledPatient, 'Philippe Claire');
        });
    });
});
