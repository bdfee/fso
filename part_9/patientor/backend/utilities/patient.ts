import { Gender, NewPatient } from "../types";
import { isString, parseDate } from "./utils";

export const toNewPatient = (object: unknown): NewPatient => {
  if (isPatientData(object)) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(param);
};

const isPatientData = (object: unknown): object is NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing patient data");
  }
  return (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  );
};

const parseName = (text: unknown) => {
  if (!isString(text) || text.length === 0) {
    throw new Error("Incorrect or missing name, value provided:" + text);
  }
  return text;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || ssn.length === 0) {
    throw new Error("Incorrect or missing ssn, value provided: " + ssn);
  }
  return ssn;
};

const parseGender = (gender: string): string => {
  if (!isGender(gender)) {
    throw new Error("Incorrect of missing gender, value provided: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || occupation.length === 0) {
    throw new Error(
      "Incorrect or missing occupation, value provided: " + occupation,
    );
  }
  return occupation;
};
