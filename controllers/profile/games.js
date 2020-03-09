const express = require('express');
const router = express.Router();

// Utils
const gamesUtil = require('../../utils/gamesUtil.js');
const accountUtil = require('../../utils/accountUtil.js');

router
	.get('/', gamesList )
	.get('/search', (req, res) => res.render('profile/searchPage.ejs', {data : []}))
	.get('/search/query?', searchResult)
	.post('/add/:id', addGame)
	.post('/delete/:id', removeGame)
	.delete('/delete/:id', removeGame);

async function gamesList(req, res) {
	let data = [];
	try {
		const userID = req.session.user.id;
		data = await accountUtil.listGames(userID);
	} catch(err) {
		res.locals.notification = err;
	} finally {
		req.session.data = data;
		res.locals.data = data;
		res.render('./profile/gamesPage.ejs');
	}
}

async function searchResult(req, res) {
	let accept = req.accepts('html');

	try {
		const results = await gamesUtil.cards(req.query.q);

		if (!accept) {
			res.status(200).json(results);
		} else {
			res.locals.data = results;
			res.render('profile/searchPage.ejs');
		}
	} catch(err) {
		if (!accept) {
			res.status(500).send();
		} else {
			res.locals.notification = err;
			res.locals.data = [];
			res.render('profile/searchPage.ejs');
		}
	}
}

async function addGame(req, res) {
	const userID = req.session.user.id;
	const gameID = req.params.id;

	try {
		const checkExists = await gamesUtil.findGameById(gameID);
		const game = await gamesUtil.cardByID(gameID);

		if (!checkExists) {
			await gamesUtil.save(game);
		}

		await accountUtil.addGame(userID, gameID);

		res.redirect('/profile/games');
	} catch(err) {
		console.log(err); //eslint-disable-line
		res.locals.notification = err;
		res.render('profile/gamesPage.ejs', {data: []});
	}

}

async function removeGame(req, res) {
	const userID = req.session.user.id;
	const gameID = req.params.id;
	const data = req.session.data;
	const method = req.method;

	try {
		await accountUtil.removeGame(userID, gameID);

		if (method === 'DELETE') {
			res.status(204).send();
		} else {
			req.session.data = [];
			res.redirect('/profile/games');
		}
	} catch(err) {
		if (method === 'DELETE') {
			res.status(500).json(err);
		} else {
			res.locals.notification = err;
			res.locals.data = data;
			req.session.data = [];
			res.render('./profile/gamesPage.ejs');
		}
	}
}

module.exports = router;
