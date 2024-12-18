import { Area } from '../../dist/area.js';
import { Button, Field } from '../../dist/fields';

/**
 * Representation of a single Patient's page.
 */
export class PatientProfile {
    constructor() {
        this.header = new Area({
            root: new Field('//div[@id="user_profile_header"]//ul'),
            nodes: {
                profile: new Button('./li/a[text() = "Profile"]'),
                chart: new Button('./li/a[text() = "Chart"]'),
            },
        });
    }
}
