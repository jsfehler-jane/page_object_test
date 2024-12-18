import { strict as assert } from 'assert';

import { Login } from '../../pages';
import { Schedule } from '../../pages/schedule';
import { Patients } from '../../pages/patients';

describe('Patients', function () {
    describe('Foo', function () {
        it('Bar', async function () {
            const loginPage = new Login();
            await loginPage.navigate();

            await loginPage.usernameForm.username.fill('owner');
            await loginPage.usernameForm.submit.click();

            await loginPage.passwordForm.password.fill('retrocarpet');
            await loginPage.passwordForm.submit.click();

            const schedulePage = new Schedule();
            await schedulePage.header.patients.click();

            const patients = new Patients();

            const patient = await patients.patientList.getPatientByName('Emilie Chan');

            await patient.click();

            await patients.patientProfile.header.chart.click();

            await browser.pause(5000);
        });
    });
});
