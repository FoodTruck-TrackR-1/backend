const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const authRouter = require('./auth/authRouter');
const operatorRouter = require('./operators/operatorsRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/operators', operatorRouter);

module.exports = server;