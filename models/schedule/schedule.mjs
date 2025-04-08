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
            root: new Field('#app_nav_left'),
            nodes: {
                schedule: new Button('[data-e2e-id="schedule-nav"]'),
                patients: new Button('./li/a[contains(@href, "/admin#patients")]'),
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
