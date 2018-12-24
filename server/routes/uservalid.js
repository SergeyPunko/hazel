var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/uservalid', function (req, res, next) {
    res.send({isAuth:req.session.passport.user.username});
});

module.exports = router;