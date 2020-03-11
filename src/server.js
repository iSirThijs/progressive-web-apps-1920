// Dependencies
require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');

// Utilities
require('#utilities/logger.js'); // setup logger
const log4js = require('log4js');
const logger = log4js.getLogger('server');
const expressLogger = log4js.connectLogger(
	logger, 
	{ 
		level: 'debug', 
		format: ':method :url', 
		nolog: '\\/static'
	});

//controllers 
require('#controllers/database.js'); // opens up connection to db
const { requireLogin, requireGuest } = require('#controllers/account.js')

// Routers
const register = require('#routers/register.js');
const login = require('#routers/login.js');
const account = require('#routers/account.js');

process.on('error', (error) => logger.error(error));

server
	.use(expressLogger)
	.use(session({
		resave: false, // checked session docs, false is best option(for now)
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET
	}))
	.use('/static', express.static('./public'))
	.use(bodyParser.urlencoded({ extended: true}))
	.use(setLocalDefaults)
	.set('view engine', 'ejs')
	.set('views', './src/views')
	.get('/', (req, res) => res.render('other/home.ejs'))
	.use('/register', requireGuest, register)
	.use('/login', requireGuest, login)
	.use('/account', requireLogin, account)
	.use((req, res) => res.status(404).render('other/notfound.ejs'))
	.use((err, req, res) => res.status(500).render('other/error.ejs'))
	.listen(process.env.PORT || 8000);


function setLocalDefaults(req, res, next){
	res.locals.notification = false;
	
	if(req.session.user) {
		logger.trace(`User ${req.session.user.username} is logged in`);
		res.locals.user = req.session.user; 
	}
	else {
		logger.trace('No user logged in');
		res.locals.user = false;
	}

	next();
}

