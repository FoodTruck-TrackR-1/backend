const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const authRouter = require('./auth/authRouter');
const operatorRouter = require('./operators/operatorsRouter');
const dinerRouter = require('./diners/dinersRouter');
const { operatorCheck } = require('./operators/operatorMiddleware');

server.use('/api/auth', authRouter);
server.use('/api/operators', operatorCheck, operatorRouter);
server.use('/api/diners', dinerRouter);



module.exports = server;