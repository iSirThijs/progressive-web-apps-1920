const queryString = require('querystring');
const router = require('express').Router();
const logger = require('log4js').getLogger('Router - Login');
const account = require('#controllers/account.js');
const password = require('#utilities/password.js');

router
	.get('/', renderLoginPage)
	.post('/', loginUser );

module.exports = router;

function renderLoginPage(req, res){
	if(!req.session.user) {
		const query = queryString.stringify(req.query); // express parses the query, but that is not necessary
		res.locals.query = query;
		res.render('other/login.ejs');
	} else res.redirect('/profile');
}

function loginUser(req, res){
	const { username, password: plainPass } = req.body;
	logger.trace(`Login attempt from ${username}`);
	account.find(username)
		.then((user) => {
			if(user) return password.compare(plainPass, user);
			else {
				res.locals.notification = {type: 'warning', content: `User with username: ${username} doesn't exist`};
				return false;
			}
		})
		.then((user) => {
			if(user) {
				const { _id, firstName, lastName, username, email } = user;
				req.session.user = { _id, firstName, lastName, username, email };
				res.redirect(req.query.url || '/profile');
			} else if(!res.locals.notification) {
				res.locals.notification = {type: 'warning', content: `Wrong password for user ${username}`};
				res.render('other/login.ejs');
			} else {
				res.render('other/login.ejs');
			}
		})
		.catch( () => {
			res.locals.notification = {type: 'error'};
			res.render('other/login.ejs');
		});
		
}