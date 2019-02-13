const express = require('express');
const data_source = require('../model/domain');
const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(await data_source.list_domain()))
});

module.exports = router;
