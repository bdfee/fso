import {
  Patient,
  NewPatient,
  Diagnosis,
  Entry,
  NewEntry,
  BaseEntry,
} from "./types";
import { v4 as uuid } from "uuid";

import patientData from "./data/patients";
import diagnosesData from "./data/diagnoses";

const patients: Patient[] = patientData;

export const getPatients = (): Patient[] => {
  return patients;
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };
  patientData.push(newPatient);
  return newPatient;
};

const diagnoses: Diagnosis[] = diagnosesData;
export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export const getPatient = (id: string): Patient => {
  const patient = patientData.filter((patient) => patient.id === id)[0];
  return patient;
};

export const createBaseEntry = (entry: NewEntry): BaseEntry => {
  const baseEntry = {
    id: uuid(),
    ...entry,
  };
  return baseEntry;
};

export const addEntry = (entry: Entry, patientId: string): Entry => {
  const index = patientData.findIndex((obj) => obj.id === patientId);
  patientData[index].entries.push(entry);
  return entry;
};
