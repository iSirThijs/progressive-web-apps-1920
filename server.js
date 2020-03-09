require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');

// Controllers
const profile = require('./controllers/profile/profile.js');
const account = require('./controllers/account.js');

// Utils
const loginUtil = require('./utils/loginUtil.js');

server
	.use('/static', express.static('./public'))
	.use(bodyParser.urlencoded({ extended: true}))
	.use(session({
		resave: false, // checked session docs, false is best option(for now)
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET
	}))
	.set('view engine', 'ejs')
	.set('views', './views' )
	.use(setLocals)
	.get('/', loginUtil.nonRequire, home)
	.get('/login', loginUtil.nonRequire, loginUtil.page)
	.post('/login', loginUtil.nonRequire, loginUtil.enter)
	.use('/account', account)
	.use('/profile', loginUtil.require, profile)
	.use((req, res) => res.status(404).render('notFound.ejs'))
	.use((err, req, res) => res.status(500).render('errorPage.ejs'))
	.listen(process.env.PORT || 8000);

function home(req, res) {
	res.render('home.ejs');
}

function setLocals(req, res, next) {
	if (req.session.user) {
		res.locals.user = req.session.user;
		res.locals.notification = false;
		next();
	} else {
		res.locals.user = false;
		res.locals.notification = false;
		next();
	}
}
