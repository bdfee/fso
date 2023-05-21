import express from "express";
import { getDiagnoses } from "../services";

const router = express.Router();

router.get("/", (_req, res) => {
  try {
    const data = getDiagnoses();
    res.send(data);
  } catch (error) {
    res.status(400).send("Error getting diagnoses data");
  }
});

export default router;
