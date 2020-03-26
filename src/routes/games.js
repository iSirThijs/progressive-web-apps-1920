const express = require('express');
const router = express.Router();
const logger = require('log4js').getLogger('Route - Games');

// Utils
const rawg = require('#utilities/rawgapi.js');

router
	.get('/', (req, res) => res.redirect('/games/q?')) // here comes a page with trending games
	.get('/q', searchResult)
	.get('/:id', gameDetailPage);
// .post('/:id/delete', removeGame)
// .delete('/delete/:id', removeGame);




function searchResult(req, res) {
	let { search } = req.query;


	res.locals.games = [];
	res.locals.query = req.query;

	if(!search) res.render('games/search.ejs');
	else {
		rawg.findGames('games', {search})
			.then((games) => {
				res.locals.next = games.next;
				res.locals.prev =games.previous;
				res.locals.games = games.results;
				return games;
			})
			.then((games) => {
				logger.trace(games);
				return games;
			})
			.catch(() => res.locals.notification = { type: 'error' })
			.finally(() => res.render('games/search.ejs'));
	}	
}

function gameDetailPage(req, res) {
	// check api for details of game
	// 2959
	// anno-2070
	logger.trace(req.params.id);

	// own solution
	igdb.findGameById(req.params.id)
		.then((game) => {
			logger.trace(game);
			return game;
		})
		.then((game)=> {
			res.locals.game = game;
			res.render('games/detailpage.ejs');
		});



}

// async function addGame(req, res) {
// 	const userID = req.session.user.id;
// 	const gameID = req.params.id;

// 	try {
// 		const checkExists = await gamesUtil.findGameById(gameID);
// 		const game = await gamesUtil.cardByID(gameID);

// 		if (!checkExists) {
// 			await gamesUtil.save(game);
// 		}

// 		await accountUtil.addGame(userID, gameID);

// 		res.redirect('/profile/games');
// 	} catch(err) {
// 		console.log(err); //eslint-disable-line
// 		res.locals.notification = err;
// 		res.render('profile/gamesPage.ejs', {data: []});
// 	}

// }

// async function removeGame(req, res) {
// 	const userID = req.session.user.id;
// 	const gameID = req.params.id;
// 	const data = req.session.data;
// 	const method = req.method;

// 	try {
// 		await accountUtil.removeGame(userID, gameID);

// 		if (method === 'DELETE') {
// 			res.status(204).send();
// 		} else {
// 			req.session.data = [];
// 			res.redirect('/profile/games');
// 		}
// 	} catch(err) {
// 		if (method === 'DELETE') {
// 			res.status(500).json(err);
// 		} else {
// 			res.locals.notification = err;
// 			res.locals.data = data;
// 			req.session.data = [];
// 			res.render('./profile/gamesPage.ejs');
// 		}
// 	}
// }

module.exports = router;
