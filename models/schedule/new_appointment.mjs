import { Area } from 'oraoraora/area.js';
import { Button, Field, Input, Text } from 'oraoraora/fields';
import { Repeating } from 'oraoraora/repeating.js';

export class NewAppointment {
    constructor() {
        this.patient = new Area({
            root: new Field(
                '//div[@id="pane-right"]//div[@class="list-group"]/li[@class="list-group-item"][2]', // eslint-disable-line @stylistic/max-len
            ),
            nodes: {
                addPatient: new Input('#e2e_appointment_patient_search'),
                patientSearchResults: new Repeating({
                    root: new Field('./div[2]/ul/a'),
                    repeated: new Area({ nodes: { name: new Button('./div[1]/span') } }),
                }),
                scheduledPatients: new Repeating({
                    root: new Field('./div[3]/ul'),
                    repeated: new Area({ nodes: { name: new Text('./div[1]') } }),
                }),
            },
        });

        this.bookAppointment = new Button(
            '//*[@data-e2e-id="e2e_scheduler_book_appointment-nav"]',
        );
    }
}
