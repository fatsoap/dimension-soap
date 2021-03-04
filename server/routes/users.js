const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

router.get('/login', (req, res) => {
    res.send('from server');
});


router.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/users/login/success', 
        failureRedirect: '/users/login/fail',
        failureMessage: true,
    })
);

router.get('/login/success', (req, res) => {
    //console.log(req.user);
    res.send({
        success: true, 
        message: '',
        user: {
            username: req.user.username,
            email: req.user.email,
            animal: req.user.animal,
            profileimage: req.user.profileimage,
        },
    })
});

router.get('/login/fail', (req, res) => {
    console.log(req.session.passport);
    var message = req.session.messages[0];
    req.session.messages = [];
    res.send({
        success: false, 
        message: message,
        user: {
            username: 'Tourist',
            email: 'Tourist',
            animal: 'Tourist',
            profileimage: 'Tourist',
        },
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.end();
});

router.post('/register', (req, res) => {
    var newUser = new User(req.body);
    User.createUser(newUser, (err, user) => {
        if(err){
            res.send({success: false, message: err});
        } else {
            res.send({success: true, message: ''});
        }            
    })
})

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
    
})

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done)  {
        User.findOne({username: username})
            .exec((err, user) => {
                if(err){
                    throw err;
                } else if(!user) {
                    return done(null, false, {message: "wrong username"}); //wrong username
                } else {
                    User.comparePassword(password, user.password, (err, isMatch) => {
                        if(err) return done(err);
                        if(isMatch){
                            return done(null, user);
                        } else {
                            return done(null, false, {message: "wrong password"}); //wrong password
                        }
                    });
                }
            });
    }
));



module.exports = router;