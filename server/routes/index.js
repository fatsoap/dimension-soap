var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */


router.get('/loggedin', ensureAuthenticated, function(req, res, next) {

});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
        console.log(req.user);
		res.send(true);
	} else {
        //console.log('no');
	    res.send(false);
    }
}

module.exports = router;