//import { Page } from '../dist/page.js';
//import { Area } from '../dist/area.js';
//import { Button, Input } from '../dist/fields';

import { Page } from 'oraoraora/page.js';
import { Area } from 'oraoraora/area.js';
import { Button, Input } from 'oraoraora/fields';

/**
 * Representation of Jane's login page.
 */
export class Login extends Page {
    constructor() {
        super();

        this.urlSuffix = 'login';

        this.usernameForm = new Area({
            nodes: {
                username: new Input('#auth_key'),
                submit: new Button('#log_in'),
            },
        });

        this.passwordForm = new Area({
            nodes: {
                password: new Input('#password'),
                submit: new Button('#log_in'),
            },
        });
    }
}
