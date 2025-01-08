import { PatientList } from "./patient_list.mjs";
import { PatientProfile } from "./patient_profile.mjs";

export class Patients {
  constructor() {
    this.patientList = new PatientList();

    this.patientProfile = new PatientProfile();
  }
}
