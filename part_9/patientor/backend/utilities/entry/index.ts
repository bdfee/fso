import { NewEntry, BaseEntry, Entry } from "../../types";
import { toHealthCheckEntry } from "./healthCheck";
import { toHospitalEntry } from "./hospital";
import { toOccupationalHealthcare } from "./occupationalHealthcare";
import { isString, parseDate } from "../utils";

export const toNewEntry = (object: unknown): NewEntry => {
  if (isEntryData(object)) {
    const newEntry = {
      ...object,
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: parseType(object.type),
      ...(object.diagnosisCodes
        ? { diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes) }
        : {}),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toTypedEntry = (entry: BaseEntry): Entry => {
  let typedEntry: Entry;
  switch (entry.type) {
    case "Hospital":
      typedEntry = toHospitalEntry(entry);
      break;
    case "HealthCheck":
      typedEntry = toHealthCheckEntry(entry);
      break;
    case "OccupationalHealthcare":
      typedEntry = toOccupationalHealthcare(entry);
      break;
    default:
      throw new Error("Invalid entry type provided");
  }
  return typedEntry;
};

const isEntryData = (object: unknown): object is NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing Entry data");
  }
  return (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  );
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error(
      "Incorrect or missing description, value provided: " + description,
    );
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error(
      "Incorrect or missing specialist, value provided: " + specialist,
    );
  }
  return specialist;
};

const parseType = (type: unknown): string => {
  if (!isString(type)) {
    throw new Error("Incorrect or missing type, value provided: " + type);
  }
  return type;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown[]): string[] => {
  const codes = diagnosisCodes.map((code) => {
    if (!isString(code)) {
      throw new Error("Incorrect diagnosis code, value provided: " + code);
    } else return code;
  });

  return codes;
};
