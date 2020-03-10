const logger = require('log4js').getLogger('database');
const mongoose = require('mongoose');
const server = process.env.DB_HOST;
const options = {
	dbName: process.env.DB_NAME,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};
const db = mongoose.connection;

db
	.on('connecting', () => logger.info('Connecting to DB'))
	.on('open', () => logger.info('DB connection open'))
	.on('disconnecting', () => logger.info('Closing DB connections'))
	.on('disconnected', () => logger.info('DB connection is closed'))
	.on('reconnected', () => logger.info('reconnected to DB'))
	.on('reconnectFailed', () => logger.error('reconnection failed'))
	.on('error', error => logger.error(error));

mongoose.connect(server, options);

exports.ready = () => mongoose.connection.readyState === 1 ? true : false;