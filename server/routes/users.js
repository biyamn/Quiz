const express = require('express');
const router = express.Router();
const conn = require('../db');
router.use(express.json());

router
  .route('/users')
  .get((req, res) => {
    const sql = 'SELECT * FROM users';
    conn.query(sql, (err, results) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.status(404).json('유저 정보가 없습니다.');
      }
    });
  })
  .post((req, res) => {
    const { nickname, score, time } = req.body;
    const sql = 'INSERT INTO users (nickname, score, time) VALUES (?, ?, ?)';
    conn.query(sql, [nickname, score, time], (err, results) => {
      if (err) {
        res.status(400).json('유저 정보를 저장하지 못했습니다.');
      } else {
        res.status(201).json(results);
      }
    });
  });

module.exports = router;
