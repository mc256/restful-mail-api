const express = require('express');
const validate = require('express-validation');
const common_validation = require('../model/validation/common');
const data_source = require('../model/domain');
const router = express.Router();

router.get('/domain/:keyword?', validate(common_validation), async function (req, res, next) {
  try {
    res.send(JSON.stringify(await data_source.list_domain(req.params.keyword)))
  }catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
});

router.post('/domain',async function(req, res, next){
  console.log(req.body.domain_name);
  console.log(req.body.testt);


});

module.exports = router;
