const express = require('express');
const router = express.Router();

const data_source = require('../model/forwarding');

const validate = require('express-validation');
const joi = require('joi');


router.get('/', validate({
    body: {
        offset: joi.number().min(0).optional(),
        pageSize: joi.number().min(1).max(parseInt(process.env.MAX_PAGE_SIZE)).optional(),
        keywordForm: joi.string().optional(),
        keywordTo: joi.string().optional()
    }
}), async function (req, res, next) {
    try{
        const result = await data_source.list(req.body.keywordForm, req.body.keywordTo, req.body.offset, req.body.pageSize);
        res.send({
            status:200,
            statusText:'OK',
            data: result.data,
            page: result.page
        });
    }catch (e) {
        next(e);
    }
});

router.put('/', validate({
    body:{
        source: joi.string().email().required(),
        destination: joi.string().email().required()
    }
}), async function(req, res, next){
    try{
        const result = await data_source.add(req.body.source, req.body.destination);
        res.send({
            status:200,
            statusText:'OK',
            data: result
        })
    }catch (e) {
        next(e);
    }
});

router.delete('/', validate({
    body:{
        source: joi.string().email().required(),
        destination: joi.string().email().required()
    }
}),async function (req, res, next){
    try{
        const result = await data_source.delete(req.body.source, req.body.destination);
        res.send({
            status: 200,
            statusText: 'OK',
            data: result
        })
    }catch (e) {
        next(e);
    }
});

module.exports = router;