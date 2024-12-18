import { Area } from 'oraoraora/area.js';
import { Button, Field, Text } from 'oraoraora/fields';
import { Repeating } from 'oraoraora/repeating.js';

import { browser } from '@wdio/globals';

/**
 * Representation of the staff filter on Jane's Schedule.
 */
export class StaffFilter {
    constructor() {
        this.staffMembers = new Repeating({
            root: new Field('//div[@id="user-list"]/ul/li'),
            repeated: new StaffMember(),
        });
    }

    async getStaffByName(name) {
        const children = await this.staffMembers.children();
        let found = null;

        for (const staffMember of children) {
            const fullName = await staffMember.getFullName();

            if (fullName === name) {
                found = staffMember;
            }
        }

        return found;
    }
}

class StaffMember extends Area {
    clone() {
        let newRoot;
        if (this.root) {
            newRoot = this.root.clone();
        } else {
            newRoot = null;
        }

        const newNodes = {};
        for (const [name, value] of Object.entries(this._items)) {
            newNodes[name] = value.clone();
        }

        const args = {
            root: newRoot,
            nodes: newNodes,
        };
        const newArea = new StaffMember(args);

        return newArea;
    }

    constructor() {
        const container = new Field('./a/parent::li');

        const firstName = new Text('./a/span[1]');
        const lastName = new Text('./a/span[2]');

        const toolbar = new Area({
            root: new Field('./div'),
            nodes: {
                toggleTreatments: new Button('./button[@title="Toggle Treatments"]'),
                toggleCalendarView: new Button('./button[@title="Toggle Schedule"]'),
            },
        });

        async function changeOpacity(field) {
            const elem = await field.find();
            await browser.execute((a) => {
                a.style.opacity = 100;
            }, elem.rawElem.parent);
        }

        toolbar.toggleTreatments.before('click', changeOpacity);

        const treatments = new Repeating({
            root: new Field('//ul[@class="treatments"]/li'),
            repeated: new Area({
                nodes: {
                    showAvailableTimes: new NetworkButton('./button[1]'),
                    title: new Text('./button[2]/strong'),
                    info: new Text('./button[2]'),
                },
            }),
        });

        super({ nodes: { container, firstName, lastName, toolbar, treatments } });
    }

    async getFullName() {
        const firstName = await this.firstName.textContent();
        const lastName = await this.lastName.textContent();

        return `${firstName} ${lastName}`;
    }

    async isActive() {
        const elem = this.container.parentElement;
        const elemClass = await elem.rawElem.getAttribute('class');
        if (elemClass === 'list-group-item active') {
            return true;
        }

        return false;
    }
}

class NetworkButton extends Button {
    constructor(selector) {
        super(selector);

        function waitForNetwork() {
            // TODO Create spies
        }

        // TODO this.after('click', waitForNetwork);
    }
}
