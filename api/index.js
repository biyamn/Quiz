import express from 'express';
import router from './routes/users.js';
import cors from 'cors';

import { db } from './db.js';

db.connect();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/user', router);

app.get('/api/user', (req, res) => {
  res.json('user');
});

app.post('/api/user', (req, res) => {
  res.json('user');
});

app.listen(8000, () => {
  console.log('Connected');
});
