import { Area } from '../../../dist/area.js';
import { Button, Field, Text } from '../../../dist/fields';
import { Repeating } from '../../../dist/repeating.js';

import { browser } from '@wdio/globals';

export class WeekView {
    constructor() {
        this.sunday = new DayColumn(1);
        this.monday = new DayColumn(2);
        this.tuesday = new DayColumn(3);
        this.wednesday = new DayColumn(4);
        this.thursday = new DayColumn(5);
        this.friday = new DayColumn(6);
        this.saturday = new DayColumn(7);
    }
}

class DayColumn {
    constructor(dayNumber) {
        this.header = new Area({
            root: new Field(`//div[@class="calendar-inner"]/div[1]/div/ul/li[${dayNumber}]`),
            nodes: { date: new Text('./div[@class="date"]') },
        });

        this.disciplines = new Repeating({
            root: new Field(
                `//div[@class="calendar-inner"]/div[1]/div/ul/li[${dayNumber}]//ul[@class="disciplines"]/li`, // eslint-disable-line @stylistic/max-len
            ),
            repeated: new Area({
                nodes: {
                    name: new Text('./span[@class="discipline-name"]/a'),
                    staff: new Repeating({
                        root: new Field('./ul[@class="staff-names"]/li'),
                        repeated: new Area({
                            nodes: { name: new Text('./div/a[@class="name"]') },
                        }),
                    }),
                },
            }),
        });

        this.disciplineSlots = new Repeating({
            root: new Field(
                `//div[@class="days-scroll-container"]//ul[@class="days unstyled"]/li[${dayNumber}]//ul[@class="disciplines"]/li`, // eslint-disable-line @stylistic/max-len
            ),
            repeated: new Repeating({
                root: new Field('./ul[@class="staff-days"]/li'),
                repeated: new Repeating({
                    root: new Field('.//ul[@class="appointments"]/li'),
                    repeated: new Area({
                        nodes: {
                            showAppointment: new Button('./button'),
                            details: new Text('./button//div[@data-testid="appointment-details"]'),
                            time: new Text(
                                './button//div[@class="time"]//span[@class="hide-condensed"]',
                            ),
                        },
                    }),
                }),
            }),
        });
    }

    async getSchedule({ discipline = '', staff = '' }) {
        // Get the correct discipline column for the day.
        const children = await this.disciplines.children();

        let correctIdx = 0;
        let correctDiscipline = null;

        for await (const [index, element] of children.entries()) {
            const val0 = await element.name.textContent();
            if (val0 === discipline) {
                correctIdx = index;
                correctDiscipline = element;
                break;
            }
        }

        if (correctDiscipline === null) {
            throw new Error(`discipline ${discipline} not found.`);
        }

        await browser.pause(10000);

        // Get the index for the column for the correct staff member
        const correctDisciplineName = await correctDiscipline.name.textContent();
        const staffAreas = correctDiscipline.staff;

        const correctDisciplineInfo = await staffAreas.children();
        let oCorrectIdx = -1;

        for await (const [index, element] of correctDisciplineInfo.entries()) {
            const val1 = await element.name.textContent();
            if (val1 === staff) {
                oCorrectIdx = index;
                break;
            }
        }

        if (oCorrectIdx === -1) {
            throw new Error(`staff ${staff} not found.`);
        }

        let staffSlots = null;
        const sDiscipline = await this.disciplineSlots.children();
        const ssDiscipline = sDiscipline[correctIdx];

        await browser.pause(10000);

        const sssDiscipline = await ssDiscipline.children();

        for (const [index, element] of sssDiscipline.entries()) {
            if (index === oCorrectIdx) {
                staffSlots = element;
                break;
            }
        }

        const cx = staffSlots.children();

        return cx;
    }
}
