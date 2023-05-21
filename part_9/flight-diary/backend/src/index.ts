import express from 'express';
import { requestLogger } from './logger';
const app = express();
import cors from 'cors';

import diaryRouter from './routes/diaries';

app.use(express.json());
app.use(cors());
app.use(requestLogger);


app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});