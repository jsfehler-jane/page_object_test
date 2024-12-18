import { Area } from '../../dist/area.js';
import { Button, Field } from '../../dist/fields';

export class Chart {
    constructor() {
        this.newChartEntry = new Button('#vtc-enabled');

        this.newChartEntryOptions = new Area({
            root: new Field('//div[@id="user_profile_content"]/div/div/div[1]/div/div[2]/div/ul'),
            nodes: { note: new Field('./li/a[text() = "Note"]') },
        });
    }
}
