const log4js = require('log4js');
const logOptions = {
	appenders: { 
		out: { type: 'stdout'}
	},
	categories: { 
		default: { appenders: ['out'], level: process.env.LOGLEVEL}
	}
};

log4js.configure(logOptions);