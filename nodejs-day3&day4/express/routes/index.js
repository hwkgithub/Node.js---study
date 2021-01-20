var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express + MongoDB 项目',
    username: req.session.username
  });
});

router.get('/registor', function (req, res) {
  res.render('registor', {})
})

router.get('/login', function (req, res) {
  res.render('login', {})
})

router.get('/logout', function (req, res) {
  // 方法一
  // req.session.username = undefined
  // res.redirect('/')

  // 方法二
  req.session.destroy(function (err) {
    res.redirect('/')
  })
})

router.get('/comment', function (req, res) {
  res.render('comment', {})
})

module.exports = router;
