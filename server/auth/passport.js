const LocalStrategy = require("passport-local").Strategy;
const passport = require('passport');
const User = require('../models/user');
const GitHubStrategy = require('passport-github2').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
})

passport.use('local', new LocalStrategy(
    {
        usernameField: 'mail'
    },
    function (mail, password, done) {
        User.findOne({ mail, password }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!user.password === password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.use(new GitHubStrategy({
    clientID: 'a3dea49b5a5f0911c3c5',
    clientSecret: 'eab7f253af208fad6cc927651acb4fcbcf8a460c',
    callbackURL: 'http://localhost:3030/users/github/callback'
},
    async (accessToken, refreshToken, profile, cb) => {
        const user = await User.findOneOrCreate({
            github: profile.id,
            username: profile.username
        });
        cb(null, user);
    }
));

module.exports = passport;
