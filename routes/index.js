
const express = require('express');
const knex = require("../db/index");

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('logIn');
});

router.get('/new', function(req, res, next) {
  res.render('new');
});

router.post('/new', (req, res) => {

  
  
});

module.exports = router;
