// Models
const Game = require('#models/games.js');

// utils
const igdb = require('#utilities/igdbapi.js');

exports.cards = function(rawGamesList) {
	if(rawGamesList.length == 0 ) return [];
	else return rawGamesList.map((game) => {
		return igdb.coverLink(game.cover, 'cover_small')
			.then((img) => {
				game.img = img;
				return game;
			});
	});

};

// exports.cardByID = async function(id) {
// 	try {
// 		const result = await igdbApi.findGameById(id);
// 		const game = result && result[0];

// 		if(game) {
// 			const gameCard = {
// 				id: game.id,
// 				title: game.name,
// 				img: await igdbApi.coverLink(game.cover, 'cover_small')
// 			};
// 			return gameCard;
// 		} else {
// 			throw {type: 'error'};
// 		}
// 	} catch(err) {
// 		throw err;
// 	}
// };

// exports.findGameById = async function(gameID) {
// 	return new Promise(function(resolve, reject) {

// 		mongoose.connect(process.env.MONGODB,
// 			{
// 				dbName: 'player2',
// 				useNewUrlParser: true
// 			});

// 		const db = mongoose.connection;

// 		db.on('error', (err) => reject(err));
// 		db.once('open', async function () {
// 			try {
// 				let data = await Game.findById(gameID);
// 				let game = data;
// 				resolve(game);
// 			} catch(err) {
// 				resolve(false);
// 			}
// 		});
// 	});
// };

// exports.save = async function(game) {
// 	return new Promise(function(resolve, reject) {
// 		const { id, title, img } = game;

// 		mongoose.connect(process.env.MONGODB,
// 			{
// 				dbName: 'player2',
// 				useNewUrlParser: true
// 			});

// 		const db = mongoose.connection;

// 		db.on('error', (err) => reject(err));
// 		db.once('open', async function () {
// 			let newGame = new Game({
// 				_id: id,
// 				title: title,
// 				img: img
// 			});

// 			newGame.save( function(err) {
// 				if (err) reject({type: 'error'});
// 				else resolve();
// 			});
// 		});
// 	});
// };
