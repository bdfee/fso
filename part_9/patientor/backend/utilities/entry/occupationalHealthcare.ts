import { BaseEntry, OccupationalHealthcare, SickLeave } from "../../types";
import { isString, parseDate } from "../utils";

export const toOccupationalHealthcare = (
  entry: BaseEntry,
): OccupationalHealthcare => {
  try {
    if (isOccupationalHealthcare(entry)) {
      if ("sickLeave" in entry && entry.sickLeave !== undefined) {
        const newOccupationalHealthcare = {
          ...entry,
          employerName: parseEmployer(entry.employerName),
          sickLeave: parseSickLeave(entry.sickLeave),
        };
        return newOccupationalHealthcare;
      } else {
        const newOccupationalHealthcare = {
          ...entry,
          employerName: parseEmployer(entry.employerName),
        };
        return newOccupationalHealthcare;
      }
    }
  } catch (error) {
    throw new Error("OccupationalHealthcare " + error);
  }
  throw new Error("Unknown occupational healthcare entry error");
};

const isOccupationalHealthcare = (
  entry: BaseEntry,
): entry is OccupationalHealthcare => {
  if (entry.type === "OccupationalHealthcare" && "employerName" in entry) {
    return "employerName" in entry;
  }
  throw new Error("Missing Employer data");
};

const isSickLeave = (object: unknown): object is SickLeave => {
  if (
    object &&
    typeof object === "object" &&
    "startDate" in object &&
    "endDate" in object
  ) {
    return true;
  }
  throw new Error(
    `Malformed sickLeave object, startDate and endDate are required`,
  );
};

const parseEmployer = (employerName: string) => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Invalid employer name, value provided: " + employerName);
  }
  return employerName;
};

const parseSickLeave = (object: SickLeave) => {
  try {
    if (isSickLeave(object)) {
      return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate),
      };
    }
  } catch (error) {
    throw new Error("Parsing sickLeave object: " + error);
  }
  throw new Error("Unknown sickleave parsing error");
};
