var express = require('express');
var router = express.Router();
const User = require('../models/user')
const passport = require('passport');

router.post('/login',
    passport.authenticate('local', {
        successRedirect: "http://localhost:3000/",
        failureRedirect: 'http://localhost:3000/login'
    }),
    function (req, res) {
        const mail = req.body.mail;
        const password = req.body.password;
        console.log(mail,password);
        User.findOne({
            mail: mail,
            password: password
        },
            function (err, doc) {
                if (err) {
                    res.status(500).send('error occured');
                }
                if (doc) {
                    res.status(200).send({isAuth:true})
                }
            }
        )
    }
)

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('http://localhost:3000/');
});

router.post('/register', function (req, res) {
    const username = req.body.username;
    const mail = req.body.mail;
    const password = req.body.password;
    User.findOne({
        mail: mail
    },
        function (err, doc) {
            if (err) {
                res.status(500).send('error occured');
            } else {
                if (doc) {
                    res.status(500).send('Mail alredy exists');
                } else {
                    const profile = new User({ username: username, mail: mail, password: password })
                    profile.save(function (err, user) {
                        if (err) {
                            res.status(500).send('db error');
                        } else {
                            res.redirect('http://localhost:3000/login');
                        }
                    })
                }
            }
        }
    )
})



router.get('/users/github',
    passport.authenticate('github'));

router.get('/users/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('http://localhost:3000/');
    });

module.exports = router;
