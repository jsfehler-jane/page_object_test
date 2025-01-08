import { Area } from "oraoraora/area.js";
import { Button, Field } from "oraoraora/fields";

/**
 * Representation of a single Patient's page.
 */
export class PatientProfile {
  constructor() {
    this.header = new Area({
      root: new Field('//div[@id="user_profile_header"]//ul'),
      nodes: {
        profile: new Button('./li/a[text() = "Profile"]'),
        chart: new Button('./li/a[text() = "Chart"]'),
      },
    });
  }
}
