const express = require('express');
const router = express.Router();
const logger = require('log4js').getLogger('Route - Games');

// Utils
const rawg = require('#utilities/rawgapi.js');
const data = require('#utilities/data.js');

router
	.get('/', (req, res) => res.redirect('/games/q?')) // here comes a page with trending games
	.get('/q', overviewPage)
	.get('/:id', detailPage);
// .post('/:id/delete', removeGame)
// .delete('/delete/:id', removeGame);

function overviewPage(req, res) {
	res.locals.query = req.query;

	let promiseData = [];

	if(Object.keys(req.query).length == 0) {
		promiseData.push(rawg.getNewTrendingList());
		promiseData.push(rawg.getList('genres'));
	} 
	else promiseData.push(rawg.getList('games', req.query));

	Promise.all(promiseData)
		.then( data => {
			if(data.length > 1) res.locals.genres = data[1].results;
			else res.locals.genres = [];

			res.locals.next = data[0].next;
			res.locals.prev = data[0].previous;

			return data[0].results;
		})
		.then((games) => data.checkImage(games))
		.then((games) => data.checkParentPlatforms(games))
		.then((games) => {
			res.locals.games = games;
		})
		.catch(() => res.locals.notification = { type: 'error' })
		.finally(() => res.render('games/overview-page.ejs'));
}

function detailPage(req, res) {
	let { id } = req.params;
	let data = [
		rawg.getGameDetails(id),
		rawg.getScreenhosts(id)
	];

	Promise.all(data)
		.then(([game, screens]) => {
			res.locals.game = true;
			Object.assign(res.locals, game);
			res.locals.screenshots = screens;

			res.render('games/detail-page.ejs');
		});


}

// function gameDetailPage(req, res) {
// 	// check api for details of game
// 	// 2959
// 	// anno-2070
// 	logger.trace(req.params.id);

// 	// own solution
// 	igdb.findGameById(req.params.id)
// 		.then((game) => {
// 			logger.trace(game);
// 			return game;
// 		})
// 		.then((game)=> {
// 			res.locals.game = game;
// 			res.render('games/detailpage.ejs');
// 		});


module.exports = router;
