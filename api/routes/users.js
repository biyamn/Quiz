import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const q = 'SELECT * FROM user';
  console.log('req.query: ', req.query);
  db.query(q, [req.query], (err, data) => {
    console.log('data: ', data);
    if (err) return res.send(error);
    return res.status(200).json(data);
  });
});

router.post('/', (req, res) => {
  console.log('post req.body: ', req.body);
  const { id, nickname, score, time } = req.body;
  console.log('id, nickname, score, time: ', id, nickname, score, time);

  const q = 'INSERT INTO user (id, nickname, score, time) VALUES (?, ?, ?, ?)';
  console.log('post q: ', q);

  const values = [id, nickname, score, time];

  db.query(q, values, (err, data) => {
    console.log('post data: ', data);

    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

export default router;
