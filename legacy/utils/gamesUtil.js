const igdbApi = require('./igdbApiUtil.js');
const mongoose = require('mongoose');

// Models
const Game = require('../models/games.js');

exports.cards = async function(query) {
	if ( !query || query.length === 0 ) {
		let err = { type: 'warning', content:'Please provide a search query' };
		throw err;
	} else {
		try {
			const promises = [];
			const games = await igdbApi.findGames(query);

			for (var i = 0; i < games.length; i++) {
				promises.push(
					new Promise(async function(resolve){
						const gameCard = {
							id: games[i].id,
							title: games[i].name,
							img: await igdbApi.coverLink(games[i].cover, 'cover_small')
						};
						resolve(gameCard);
					})
				);
			}
			const gameCards = await Promise.all(promises);
			return gameCards;
		} catch(err) {
			throw err;
		}
	}
};

exports.cardByID = async function(id) {
	try {
		const result = await igdbApi.findGameById(id);
		const game = result && result[0];

		if(game) {
			const gameCard = {
				id: game.id,
				title: game.name,
				img: await igdbApi.coverLink(game.cover, 'cover_small')
			};
			return gameCard;
		} else {
			throw {type: 'error'};
		}
	} catch(err) {
		throw err;
	}
};

exports.findGameById = async function(gameID) {
	return new Promise(function(resolve, reject) {

		mongoose.connect(process.env.MONGODB,
			{
				dbName: 'player2',
				useNewUrlParser: true
			});

		const db = mongoose.connection;

		db.on('error', (err) => reject(err));
		db.once('open', async function () {
			try {
				let data = await Game.findById(gameID);
				let game = data;
				resolve(game);
			} catch(err) {
				resolve(false);
			}
		});
	});
};

exports.save = async function(game) {
	return new Promise(function(resolve, reject) {
		const { id, title, img } = game;

		mongoose.connect(process.env.MONGODB,
			{
				dbName: 'player2',
				useNewUrlParser: true
			});

		const db = mongoose.connection;

		db.on('error', (err) => reject(err));
		db.once('open', async function () {
			let newGame = new Game({
				_id: id,
				title: title,
				img: img
			});

			newGame.save( function(err) {
				if (err) reject({type: 'error'});
				else resolve();
			});
		});
	});
};
