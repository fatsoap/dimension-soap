const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

router.get('/login', (req, res) => {
    res.send('from server');
});


router.get('/loggedin', (req, res)=>{
    
})

router.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/users/login/success', 
        failureRedirect: '/users/login/fail'
    })
);

router.get('/login/success', (req, res) => {res.send(true)});
router.get('/login/fail', (req, res) => {res.send(false)});

router.get('/logout', (req, res) => {
    req.logout();
    res.end();
});

router.post('/register', (req, res) => {
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        password2: req.body.password2,
        email: req.body.email,
        animal: req.body.animal
    });
    console.log(newUser);
    User.createUser(newUser, (err, user) => {
        if(err) throw err;
        else{
            res.send({registered: true});
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

passport.use(new LocalStrategy(
    function(username, password, done)  {
        User.getUserByUsername(id, (err, user) => {
            if(err) throw err;
            if(!user){
                return done(null, false); //wrong username
            }
            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err) return done(err);
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false); //wrong password
                }
            })
        })     
    }
));



module.exports = router;