import * as express from 'express';
import * as cors from 'cors';
import "reflect-metadata";

import { consoleLogger, fileLogger } from 'src/utils/logger';
import movies from './routes/movies';
import auth from './routes/auth';

const app = express();
const port = 8080;

app.set('port', port);

app.use(cors());
app.use(express.json());

app.use(consoleLogger);
app.use(fileLogger);

app.use('/auth', auth);
app.use('/movies', movies);

app.use((req, res, next) => {
  res.status(404);
  res.json({ msg: 'Not Found' });
});

app.use((err, req, res, next) => {
  res.status(err['status'] || 500);
  res.json(err);
});

app.listen(port, () => {
  console.log(`API Server Started at ${port}`);
});