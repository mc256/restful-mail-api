const express = require('express');
const validate = require('express-validation');
const data_source = require('../model/domain');

const router = express.Router();
const covers = require('./covers');

router.get('/:id/haha',function(req, res, next){
    console.log(req.params.id);
    console.log(req.url);
    if (req.params.id === "1"){
        req.url = "/testtest";
        res.locals.ok = "tom";
    }else{
        req.url = "/test";
        res.locals.ok = "jerry";
    }
    next();
}, covers);

module.exports = router;