import express from 'express';
import { requestLogger } from './middleware/logger';
import diagnosesRouter from './routes/diagnose';
import patientsRouter from './routes/patients';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);
app.use(express.json());

app.get('/api/ping', (_req, _res) => {
  console.log('-- pong --');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});