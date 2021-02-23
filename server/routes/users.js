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

router.post('/login',
    // passport.authenticate('local', { 
    //     successRedirect: '/users/login/success',
    //     failureRedirect: '/users/login/fail' 
    // })
    //(req,res)=>res.send('suddd')

    passport.authenticate('local',{failureRedirect:'/users/login/fail'}),
    function(req, res) {
        console.log('yeee');
        res.redirect('/users/login/success');
    }
);

router.get('/login/success', (req, res) => {res.send('successssss')});
router.get('/login/fail', (req, res) => {res.send('failllllll')});

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    /*
    User.findById(id, (err, user) => {
        done(err, user);
    })
    */
   var user = {
        id: 'asdfghjkl',
        username: 'admin',
        password: 'hash_admin',
    };  
   done(null, user);
})

passport.use(new LocalStrategy(
    function(username, password, done)  {
        console.log('opop');
        return done(null, {username: username, password: password });
    }
));



module.exports = router;