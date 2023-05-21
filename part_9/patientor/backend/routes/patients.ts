import express from "express";
import { toNewEntry, toTypedEntry } from "../utilities/entry";
import { toNewPatient } from "../utilities/patient";
import {
  getPatients,
  addPatient,
  getPatient,
  createBaseEntry,
  addEntry,
} from "../services";

const router = express.Router();

router.get("/", (_req, res) => {
  try {
    const data = getPatients();
    res.send(data);
  } catch (error: unknown) {
    let errorMessage = "Error getting patient: ";
    if (error instanceof Error) {
      res.status(400).send((errorMessage += error.message));
    } else {
      res.status(500).send((errorMessage += "Unknown error"));
    }
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Error posting patient: ";
    if (error instanceof Error) {
      res.status(400).send((errorMessage += error.message));
    } else {
      res.status(500).send((errorMessage += "Unknown error"));
    }
  }
});

router.get("/:id", (req, res) => {
  try {
    const patient = getPatient(req.params.id);
    res.send(patient);
  } catch (error: unknown) {
    let errorMessage = "Error getting patient: ";
    if (error instanceof Error) {
      res.status(400).send((errorMessage += error.message));
    } else {
      res.status(500).send((errorMessage += "Unknown error"));
    }
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const baseEntry = createBaseEntry(newEntry);
    const typedEntry = toTypedEntry(baseEntry);
    const addedEntry = addEntry(typedEntry, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Error posting patient entry: ";
    if (error instanceof Error) {
      res.status(400).send((errorMessage += error.message));
    } else {
      res.status(500).send((errorMessage += "Unknown error"));
    }
  }
});

export default router;
