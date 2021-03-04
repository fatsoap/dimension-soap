var express = require('express');
var router = express.Router();
var Article = require('../models/article');

/* GET home page. */
router.get('/articles', async (req, res) => {
	var article = await Article.find().sort({
		date: 'desc'
	});
	res.send(article);
})

router.get('/checkLogin', ensureAuthenticated, function(req, res, next) {

	res.end();
});

router.post('/article', async (req, res) => {
	var article = new Article({
		title: req.body.title,
		author: req.body.author,
		description: req.body.description,
		markdown: req.body.markdown
	});

	var articleID = await article.save();
	res.send(articleID.slug);
})

router.put('/article', async (req, res) => {
	var article = await Article.findById(req.body.id);
	article.title = req.body.title;
	article.description = req.body.description;
	article.markdown = req.body.markdown;

	var articleID = await article.save();
	res.send(articleID.slug);
})

router.get('/article/:slug', async (req, res) => {
	var article = await Article.findOne({ slug: req.params.slug });
	res.send(article);
})

router.delete('/article/:id', async (req, res) => {
	await Article.findByIdAndDelete(req.params.id)
	res.end();
})

function ensureAuthenticated(req, res, next){
	//console.log(req.user);
	var defaultUser = {
        username: 'Tourist',
        email: 'Tourist',
        animal: 'Tourist',
        profileimage: 'Tourist',
    };
	if(req.isAuthenticated()){   
		res.send({
			login: true,
			user: req.user
		});
	} else {
	    res.send({
			login: false,
			user: defaultUser
		});
    }
}

module.exports = router;