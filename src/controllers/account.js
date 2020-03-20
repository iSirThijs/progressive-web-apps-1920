// this houses utils for account
const logger = require('log4js').getLogger('Controller - Account');
const db = require('#utilities/database');
const User = require('#models/user.js');
const queryString = require('querystring');

exports.create = function(newUserInfo) {
	logger.trace('Registering new user');
	logger.trace(newUserInfo);
	let newUser = new User(newUserInfo);

	if(!db.ready()) { 
		logger.warn('DB not ready');
		throw new Error('DB not ready');
	}

	return newUser.save()
		.then((user) => {
			logger.trace('New User registered');
			logger.trace(user);
			return user;
		})
		.catch(error => {
			logger.warn(error);
			throw error;
		});
};

exports.exists  = function(field, newUserInfo) {
	const info = newUserInfo[field];
	logger.trace(`Checking existence in ${field} for ${info}`);

	if(!db.ready()) { 
		logger.warn('DB not ready');
		throw new Error('DB not ready');
	}

	return User.exists({ [field]: info})
		.then((exists) => {
			logger.trace(`Existence in ${field} for ${info} is ${exists}`);
			return exists;
		})
		.catch(error => {
			logger.warn(error);
			throw error;
		});
};

exports.find = function(username){
	logger.trace(`Searching for user ${username} in db`);

	if(!db.ready()) { 
		logger.warn('DB not ready');
		throw new Error('DB not ready');
	}

	return User.findOne({username})
		.then((user) => {
			logger.trace('Result:');
			logger.trace(user);

			if(user) return user;
			else return false;
		})
		.catch(error => {
			logger.warn(error);
			throw error;
		});

};

exports.requireLogin = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		const query = queryString.stringify({
			url: req.originalUrl
		});
		res.status(403).redirect('/login?' + query);
	}
};

exports.requireGuest = function(req, res, next) {
	if (!req.session.user) {
		next();
	} else {
		res.redirect('/');
	}
};