const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema and model for mongoose
const userSchema = new Schema({
	firstName: String,
	lastName: String,
	username: String,
	email: String,
	hash: String,
	// games: [{ type: Schema.Types.Number, ref: 'game'}]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
