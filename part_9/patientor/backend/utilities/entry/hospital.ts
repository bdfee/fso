import { BaseEntry, HospitalEntry, Discharge } from "../../types";
import { isString, parseDate } from "../utils";

export const toHospitalEntry = (entry: BaseEntry): HospitalEntry => {
  try {
    if (isHospitalEntry(entry)) {
      const newHospitalEntry = {
        ...entry,
        discharge: parseDischarge(entry.discharge),
      };
      return newHospitalEntry;
    }
  } catch (error) {
    throw new Error("Hospital " + error);
  }

  throw new Error("Unknown hospital entry error");
};

const isHospitalEntry = (entry: BaseEntry): entry is HospitalEntry => {
  if (entry.type === "Hospital" && "discharge" in entry) {
    return "discharge" in entry;
  }
  throw new Error("Incorrect or missing discharge data for Hospital Entry");
};

// hospital discharge
const isDischargeEntry = (object: unknown): object is Discharge => {
  if (
    object &&
    typeof object === "object" &&
    "date" in object &&
    "criteria" in object
  ) {
    return true;
  }
  throw new Error(
    `Malformed discharge data object, date and criteria fields are required`,
  );
};

const parseCriteria = (criteria: string): string => {
  if (!isString(criteria)) {
    throw new Error(
      "incorrect or missing discharge criteria, value provided: " + criteria,
    );
  }
  return criteria;
};

const parseDischarge = (object: unknown): Discharge => {
  try {
    if (isDischargeEntry(object)) {
      const newDischarge = {
        date: parseDate(object.date),
        criteria: parseCriteria(object.criteria),
      };
      return newDischarge;
    }
  } catch (error) {
    throw new Error("parsing discharge object: " + error);
  }
  throw new Error("Unknown discharge object parsing error");
};
