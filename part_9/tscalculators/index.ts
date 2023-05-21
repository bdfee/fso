import express, { Request, Response } from 'express';
import { parseBmiQuery, calculateBmi } from './bmiCalculator';
import {  parseExerciseBody, calculateExcercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req: Request, res: Response) => {
    try {
      const { height, weight } = parseBmiQuery(req);
      const message = calculateBmi(height, weight);
      res.send({
        height,
        weight,
        bmi: message
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred.');
      }
    }
});

app.post('/api/exercises', (req: Request, res: Response) => {
  try {
    const { dailyExercises, target } = parseExerciseBody(req);
    const report = calculateExcercises(target, dailyExercises);
    res.send(report);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('An unknown error occured');
    }
  }
});


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});