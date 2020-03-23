// Dependencies
require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');

// Utilities
require('#utilities/logger.js');
const log4js = require('log4js');
const logger = log4js.getLogger('server');
const expressLogger = log4js.connectLogger(logger, { 
		level: 'auto', 
		statusRules: [
			{ from: 200, to: 399, level: 'trace'},
			{ from: 400, to: 499, level: 'debug'},
			{ from: 500, to: 599, level: 'warn'}
		],
		format: ':status :method :url',
		nolog: '\\/public' 
});
require('#utilities/database.js');

//Controllers 
const { requireLogin, requireGuest } = require('#controllers/account.js');

// Routers
const register = require('#routes/register.js');
const login = require('#routes/login.js');
const account = require('#routes/account.js');

process.on('error', (error) => logger.error(error));

server
	// Logger
	.use(expressLogger)
	
	// Middleware
	.use(bodyParser.urlencoded({ extended: true}))
	.use(session({
		resave: false, // checked session docs, false is best option(for now)
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET
	}))
	.set('view engine', 'ejs')
	.set('views', './src/views')
	.use(setLocalDefaults)
	
	// Routes
	.get('/', (req, res) => res.render('other/home.ejs'))
	.use('/public', express.static('./public', {
		etag: false,
		maxAge: 1000 * 60 * 60 * 24 * 365,
		setHeaders: returnStaticFilesHeaders
	}))
	.use('/register', requireGuest, register)
	.use('/login', requireGuest, login)
	.use('/account', requireLogin, account)
	
	// Error handling
	/* eslint-disable no-unused-vars */
	.get('/offline', (req, res) => res.render('other/offline.ejs'))
	.use((req, res, next) => res.status(404).render('other/notfound.ejs'))
	.use((err, req, res, next) => res.status(500).render('other/error.ejs'))
	/* eslint-enable no-unused-vars */
	
	// Enable server
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



function returnStaticFilesHeaders(res, path) {
	let splitPath = path.split('/');
	if(splitPath.includes('service-worker.js')) {
		res.set('service-worker-allowed', '/');
	}
}