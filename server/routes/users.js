const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//const User = require('../models/user');

router.get('/login', (req, res) => {
    res.send('from server');
});

// router.post('/login',(req, res, next) => {
//     //passport.authenticate('local'),
//     passport.authenticate('local', (err, user, info) => {
//         if(err) {return next(err);}
//         if(!user) {return res.send('no user')}
//         res.logIn(user,  (err) => {
//             if(err) {return next(err);}
//             return res.send('good');
//         });
    
//     })
// });

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

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    /*
    User.findById(id, (err, user) => {
        done(err, user);
    })
    */
   var user = {
        username: 'admin',
        password: 'hash_admin',
    };  
   done(null, user);
})

passport.use(new LocalStrategy(
    function(username, password, done)  {
        if(username === 'admin'){
            return done(null, {username: username, password: password });
        }else{
            return done(null, false);
        }        
    }
));



module.exports = router;