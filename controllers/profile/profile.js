const express = require('express');
const router = express.Router();

// sub controllers
const gamesPage = require('./games.js');

router
	.get('/', (req, res) => (res.redirect('/profile/games')))
	.use('/games', gamesPage);

// function profilePage(req, res) {
// 	res.render('./profile/profilePage.ejs');
// }




module.exports = router;
