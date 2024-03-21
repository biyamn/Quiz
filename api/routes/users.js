import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const q = 'SELECT * FROM user';
  db.query(q, [req.query], (err, data) => {
    console.log('data: ', data);
    if (err) return res.send(error);
    return res.status(200).json(data);
  });
});

export default router;
