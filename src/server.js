// Dependencies
require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const minifyHTML = require('express-minify-html-2');

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

// Routers
const register = require('#routes/register.js');
const login = require('#routes/login.js');
const account = require('#routes/account.js');
const profile = require('#routes/profile.js');
const games = require('#routes/games.js');


// Options
const sessionOptions = {
	resave: false, // checked session docs, false is best option(for now)
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET
};
const minifyOptions = {
	override:      true,
	exception_url: false,
	htmlMinifier: {
		removeComments:            true,
		collapseWhitespace:        true,
		collapseBooleanAttributes: true,
		removeAttributeQuotes:     true,
		removeEmptyAttributes:     true,
		minifyJS:                  true
	}
};
const staticFilesOptions =  {
	etag: false,
	// maxAge: 1000 * 60 * 60 * 24 * 365,
	setHeaders: returnStaticFilesHeaders
};

process.on('error', (error) => logger.error(error));

server
	// Logger
	.use(expressLogger)
	
	// Middleware
	.use(bodyParser.urlencoded({ extended: true}))
	.use(session(sessionOptions))
	.set('view engine', 'ejs')
	.set('views', './src/views')
	.use(minifyHTML(minifyOptions))
	.use(setLocalDefaults)
	
	// Routes
	.get('/', (req, res) => res.render('other/home.ejs'))
	.use('/public', express.static('./public', staticFilesOptions))
	.use('/register', register)
	.use('/login', login)
	.use('/account', account)
	.use('/profile', profile)
	.use('/games', games)
	
	// Error handling
	/* eslint-disable no-unused-vars */
	.get('/offline', (req, res) => res.render('other/offline.ejs'))
	.use((req, res, next) => res.status(404).render('other/notfound.ejs'))
	.use((err, req, res, next) => {
		logger.warn(err);
		res.status(500).render('other/error.ejs');
	})
	/* eslint-enable no-unused-vars */
	
	// Enable server
	.listen(process.env.PORT || 8000);




// Helper functions 
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