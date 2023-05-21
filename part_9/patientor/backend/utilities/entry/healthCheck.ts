import { BaseEntry, HealthCheckEntry, HealthCheckRating } from "../../types";

export const toHealthCheckEntry = (entry: BaseEntry): HealthCheckEntry => {
  try {
    if (isHealthCheckEntry(entry)) {
      const newHealthCheckEntry = {
        ...entry,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
      return newHealthCheckEntry;
    }
  } catch (error) {
    throw new Error("HealthCheck " + error);
  }
  throw new Error("Unknown healthCheckEntry error");
};

const isHealthCheckEntry = (entry: BaseEntry): entry is HealthCheckEntry => {
  if ("healthCheckRating" in entry && entry.type === "HealthCheck") {
    return "healthCheckRating" in entry;
  }
  throw new Error("Missing healthCheckRating for Health Check Entry");
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  if (rating === 0) return true;

  if (
    !Number(rating) ||
    typeof rating !== "number" ||
    isNaN(Number(rating)) ||
    rating > 3 ||
    rating < 0
  ) {
    throw new Error("Invalid value provided for healthCheckRating: " + rating);
  }
  return true;
};

const parseHealthCheckRating = (rating: number): HealthCheckRating => {
  try {
    if (isHealthCheckRating(rating)) {
      return Number(rating);
    }
  } catch (error) {
    throw new Error("healthCheckRating parsing: " + error);
  }
  throw new Error("Unknown healthCheckRating parsing error");
};
