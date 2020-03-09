const router = require('express').Router();

router
	.get('/', renderRegisterPage) //renders the page
	// .post('/'); // saves the account to database

module.exports = router;

function renderRegisterPage(req, res) {
	// TODO check existence
	// TODO check password requirements

	// save to db
	res.send('hello');

}