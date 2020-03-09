const express = require('express');
const router = express.Router();

// Utils
const accountUtil = require('../utils/accountUtil.js');
const loginUtil = require('../utils/loginUtil.js');

router
	.get('/', loginUtil.require, (req, res) => res.render('account/accountPage.ejs'))
	.get('/register', loginUtil.nonRequire, (req, res) => res.render('account/register.ejs'))
	.post('/register', register)
	.get('/signout', signOut);

async function register(req, res) {
	let userInfo = req.body;
	try {
		// server validation checks
		await accountUtil.checkExistence('email', userInfo.email);
		await accountUtil.checkExistence('username', userInfo.username);
		await accountUtil.checkPassReqs(userInfo.password);

		// actually saving the user to the database
		let user = await accountUtil.create(userInfo);
		req.session.user = {
			username: user.username,
			id: user._id
		};
		res.redirect('/profile');
	} catch(err) {
		res.locals.notification = err;
		res.render('account/register.ejs');
	}
}

function signOut(req, res) {
	req.session.destroy(() => res.redirect('/'));
}

module.exports = router;
