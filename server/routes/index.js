var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/loggedin', ensureAuthenticated, function(req, res, next) {

});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
        //console.log('yes');
		res.send(true);
	} else {
        //console.log('no');
	    res.send(false);
    }
}
module.exports = router;