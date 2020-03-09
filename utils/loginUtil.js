const queryString = require('querystring');
const mongoose = require('mongoose');
const argon2 = require('argon2');

// required models
const User = require('../models/user.js');

exports.page = function(req, res) {
	if(!req.session.user) {
		const query = queryString.stringify(req.query); // express parses the query, but I dont want it to
		res.locals.query = query;
		res.render('login.ejs');
	} else res.redirect('/profile');
};

exports.enter = async function(req, res) {
	try {
		let username = req.body.username;
		let password = req.body.password;
		let result = await login(username, password);
		let {match, user} = result;

		if (match) {
			req.session.user =
			{
				username: user.username,
				id: user._id
			};
			res.redirect(req.query.url || '/'); //the originalUrl must be passed here
		} else {
			const query = queryString.stringify(req.query); // express parses the query, but I dont want it to
			res.locals.query = query;
			res.locals.notification = {
				type: 'warning',
				content: 'Password isn\'t correct'
			};
			res.render('login.ejs');
		}
	} catch(err) {
		const query = queryString.stringify(req.query); // express parses the query, but I dont want it to
		res.locals.query = query;
		res.locals.notification = err;
		res.render('login.ejs');
	}
};

exports.require = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		const query = queryString.stringify({
			url: req.originalUrl
		});
		res.status(403).redirect('/login?' + query);
	}
};

exports.nonRequire = function(req, res, next) {
	if (!req.session.user) {
		next();
	} else {
		res.redirect('/profile');
	}
};

function login(username, password) {
	return new Promise(function(resolve, reject) {
		mongoose.connect(process.env.MONGODB,
			{
				dbName: 'player2',
				useNewUrlParser: true
			});
		const db = mongoose.connection;

		db.on('error', (err) => reject(err));
		db.once('open', async function() {
			let data = await User.find({ username: username});
			let user = data && data[0];

			if (user) {
				let match = await argon2.verify(user.hash, password);
				resolve({
					match: match,
					user: user
				});
			} else {
				reject({type: 'warning', content: 'This user doesn\'t exist'});
			}
		});
	});
}
