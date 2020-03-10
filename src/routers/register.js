const router = require('express').Router();
const logger = require('log4js').getLogger('Router - Register');

const account = require('#controllers/account.js');

const password = require('#utilities/password.js');

router
	.get('/', (req, res) => res.render('other/register.ejs')) //renders the page
	.post('/', checkExistence, checkPassword, hashPassword, registerNewUser ); // saves the account to database

module.exports = router;

async function checkExistence(req, res, next){
	const newUserInfo = req.body;

	try {
		const username = await account.exists('username', newUserInfo);
		const email = await account.exists('email', newUserInfo);

		if(!username && !email) next();
		else if(username){
			res.locals.notification = { type: 'warning', content: `A user with the username ${newUserInfo.username} already exists`};
			res.render('other/register.ejs');
		} else if(email) {
			res.locals.notification = { type: 'warning', content: `A user with the email ${newUserInfo.email} already exists`};
			res.render('other/register.ejs');
		}

	} catch(error) {
		res.locals.notification = { type: 'error' };
		res.render('other/register.ejs');
	}
}

function checkPassword(req, res, next) {
	if(password.checkLength(req.body.password)) next();
	else { 
		res.locals.notification = {type: 'warning', content:'Your password doesn\'t meet the requirements'};
		res.render('other/register.ejs');
	}
}

function hashPassword (req, res, next) {
	password
		.hash(req.body.password)
		.then((hash) => req.body.hash = hash)
		.then(() => next())
		.catch(error => {
			logger.error(error);
			res.locals.notification = { type: 'error' };
			res.render('other/register.ejs');
		});
}

function registerNewUser(req, res) {
	const newUserInfo = req.body;
	account.create(newUserInfo)
		.then(() => res.redirect('/'))
		.catch(() => {
			res.locals.notification = {type: 'error'};
			res.render('other/register.ejs');
		});
}
