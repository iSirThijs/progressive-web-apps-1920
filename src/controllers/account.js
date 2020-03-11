// this houses utils for account
const logger = require('log4js').getLogger('Controller - Account');
const db = require('#controllers/database.js');
const User = require('#models/user.js');

exports.create = function(newUserInfo) {
	logger.trace('Registering new user');
	logger.trace(newUserInfo);
	let newUser = new User(newUserInfo);

	if (db.ready) {
		return newUser.save()
			.then((user) => {
				logger.trace('New User registered');
				logger.trace(user);
				return user;
			})
			.catch(error => {
				logger.error(error);
				throw error;
			});
	} else {
		logger.trace('DB not ready');
		throw new Error('DB not ready');
	}
	
};

exports.exists  = function(field, newUserInfo) {
	const info = newUserInfo[field];
	logger.trace(`Checking existence in ${field} for ${info}`);

	logger.trace(db.ready);

	if (db.ready) {	
		return User.exists({ [field]: info})
			.then((exists) => {
				logger.trace(`Existence in ${field} for ${info} is ${exists}`);
				return exists;
			})
			.catch(error => {
				logger.error(error);
				throw error;
			});
	} else {
		logger.trace('DB not connected');
		throw new Error('DB not connected');
	}
};

exports.find = function(username){
	logger.trace(`Searching for user ${username} in db`);
	if(db.ready){
		return User.findOne({username})
			.then((user) => {
				logger.trace('Result:');
				logger.trace(user);

				if(user) return user;
				else return false;
			})
			.catch(error => {
				logger.error(error);
				throw error;
			});
	} else {
		logger.trace('DB not connected');
		throw new Error('DB not connected');
	}
};