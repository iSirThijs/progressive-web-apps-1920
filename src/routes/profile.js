const express = require('express');
const router = express.Router();
const { requireLogin } = require('#controllers/account.js');

router
	.use(requireLogin)
	.use((req, res, next) => {
		res.locals.games = undefined;
		next();
	})
	.get('/', (req, res) => res.render('profile/home.ejs'))
	.get('/games', gamesList);


function gamesList(req, res) {
	res.render('profile/gamelibrary.ejs');
}



module.exports = router;
