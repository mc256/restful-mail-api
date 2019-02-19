require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const mainRouter = require('./routes/main');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/', indexRouter);
app.use('/'+process.env.APP_VERSION, mainRouter);

app.use(function(req, res, next) {
    res.status(404).send({
        status:404,
        statusText:'Not Found',
        error: []
    });
});

app.use(function (error, req, res, next){
    res.status(500).send({
        status:500,
        statusText:'Internal Server Error',
        error: [error]
    });
});

module.exports = app;
