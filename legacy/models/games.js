const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema and model for mongoose
const gameSchema = new Schema({
	_id: Number,
	title: String,
	img: String,
});

const Game = mongoose.model('Game', gameSchema, 'games');

module.exports = Game;
