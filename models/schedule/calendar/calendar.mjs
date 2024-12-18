import { Field } from '../../../dist/fields';

import { WeekView } from './week_view.mjs';

export class Calendar {
    constructor() {
        this.weekView = new WeekView();

        this.timeBar = new Field('.time-bar');
    }
}
