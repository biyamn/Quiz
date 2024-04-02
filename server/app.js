// express 모듈 셋팅
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3000;

app.use(cors());
app.listen(PORT);

const userRouter = require('./routes/users');

// /라는 경로가 있을 때 userRouter를 사용하겠다는 의미
app.use('/', userRouter);
