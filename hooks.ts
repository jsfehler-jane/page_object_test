import { WDIO } from "oraoraora/backend/wdio.js";

import { Core } from "oraoraora/core.js";

Core.backEnd = new WDIO();
Core.baseUrl = "https://demo-cac1-25.janeapp.com/";
