import { Page } from 'oraoraora/page.js';
import { Area } from 'oraoraora/area.js';
import { Button, Field, Input } from 'oraoraora/fields';

import { Calendar } from './calendar/calendar.mjs';
import { StaffFilter } from './staff_filter.mjs';

export class Schedule extends Page {
    constructor() {
        super();

        this.urlSuffix = 'admin#schedule';

        this.header = new Area({
            nodes: {
                schedule: new Button('//ul/li/a[@data-e2e-id="schedule-nav"]'),
                patients: new Button('//ul/li/a[contains(@href, "/admin#patients")]'),
            },
        });

        this.patientSearch = new Input('#list_search');

        this.staffFilter = new StaffFilter();

        this.calendar = new Calendar();

        this.calendarControls = new Area({
            root: new Field('.calendar-footer'),
            nodes: { weekView: new Button('./div[2]/div[2]/button[2]') },
        });
    }
}
