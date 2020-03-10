// Dependencies
require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');

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

// Routers
const register = require('#routers/register.js');

server
	.use(expressLogger)
	.use('/static', express.static('./public'))
	.use(bodyParser.urlencoded({ extended: true}))
	.set('view engine', 'ejs')
	.set('views', './src/views')
	.get('/', (req, res) => res.render('other/home.ejs'))
	.use('/register', register)
	.use((req, res) => res.status(404).render('other/notfound.ejs'))
	.use((err, req, res) => res.status(500).render('other/error.ejs'))
	.listen(process.env.PORT || 8000);