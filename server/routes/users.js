var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/register', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/register.html'));
});

router.get('/login', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

module.exports = router;
