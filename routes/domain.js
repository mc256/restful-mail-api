const express = require('express');
const router = express.Router();

const data_source = require('../model/domain');

const validate = require('express-validation');


router.get('/:keyword?', async function (req, res, next) {

});

router.put('/:domain',async function(req, res, next){

});

router.delete('/:domain', async function (req, res, next){

});



module.exports = router;