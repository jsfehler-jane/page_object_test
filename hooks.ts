import { WDIO } from '../../dist/backend/wdio.js';

import { Core } from '../../dist/core.js';

Core.backEnd = new WDIO();
Core.baseUrl = 'https://demo-cac1-25.janeapp.com/';
