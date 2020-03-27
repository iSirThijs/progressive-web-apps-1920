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
	.on('disconnecting', () => logger.warn('Closing DB connection'))
	.on('disconnected', () => logger.warn('No DB Connection'))
	.on('reconnected', () => logger.info('Reconnected to DB'))
	.on('reconnectFailed', () => logger.warn('Reconnection failed'));

connectToDatabase();

exports.ready = () => mongoose.connection.readyState === 1 ? true : false;


function connectToDatabase() {
	return mongoose.connect(server, options)
		.catch(error => {
			logger.warn(error.message);
			logger.info(`Retrying Connection in ${process.env.DB_RETRY_TIMEOUT} ms`);
			return setTimeout(connectToDatabase, process.env.DB_RETRY_TIMEOUT);
		});
}