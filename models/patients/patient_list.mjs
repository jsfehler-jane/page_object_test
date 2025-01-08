import { Repeating } from 'oraoraora/repeating.js';
import { Field, Button } from 'oraoraora/fields';

import { browser } from '@wdio/globals';

/**
 * Representation of a single Patient's page.
 */
export class PatientList {
    constructor() {
        this.patients = new Repeating({
            root: new Field('//div[@id="user-list"]//ul/li'),
            repeated: new Button('./a'),
        });
    }

    async getPatientByName(name) {
        const children = await this.patients.children();
        // TODO: Remove hardcoded pause
        await browser.pause(5000);
        let found = null;

        for (const patient of children) {
            const fullName = await patient.textContent();
            if (fullName === name) {
                found = patient;
                break;
            }
        }

        return found;
    }
}
