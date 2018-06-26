
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
  if (req.body.content || req.body.image_Url){
    const username = req.cookies.username
    const content = req.body.content;
    const image_Url = req.body.image_Url;

    knex
      .insert({
          username: username,
          content: content,
          image_Url: image_Url
      })
      .into("cluckrs")
      .returning("*")
      .then(([cluckr]) => {
          console.log("Cluckrs insert result:", cluckr);
          // res.send(cluckr);
          res.redirect(`/index`);
    });
      // res.send(req.body)
  } else {
    res.render('new')
  }
});

router.get('/index', (req, res) => {
  knex
  .select("*")
  .orderBy('createdAt', 'desc')
  .from("cluckrs")
  .then(cluckrs => {
      res.render("index", { allCluckrs: cluckrs });
      // res.send(cluckrs);
  });
})

module.exports = router;
