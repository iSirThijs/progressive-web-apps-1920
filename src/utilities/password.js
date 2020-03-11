const bcrypt = require('bcrypt');
const logger = require('log4js').getLogger('Utilities - Password');

// check requirements


exports.checkLength = function(password, min = 4, max = undefined) {
	if (password.length >= min)
		if(!max) return true;
		else if (password.length <= max) return true;
		else return false;
	else {
		logger.trace(`Password is shorter then ${min} characters`);
		return false;
	}
};

// hash password
exports.hash = function(password) {
	logger.trace('Hashing password');
	const salt = 10;
	return bcrypt.hash(password, salt);
};

// compare hash password
exports.compare = function(password, user){
	return bcrypt.compare(password, user.hash)
		.then((correct) => {
			if(correct) {
				logger.trace('Password correct');
				return user;
			}
			else {
				logger.trace('Password incorrect');
				return false;
			}
		});
};