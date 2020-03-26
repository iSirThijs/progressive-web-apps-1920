const logger = require('log4js').getLogger('RAWG API');
const axios = require('axios');
const request = axios.create({
	baseURL: 'https://api.rawg.io/api'
});


// Return an array of objects of 10 games containing the id, cover_id en name.
exports.findGames = function(endpoint, params) {
	const searchParams = new URLSearchParams(params);

	return request.get(`/${endpoint}?${searchParams.toString()}`)
		.then((results) => results.data)
		.catch((error) => {
			logger.warn(error);
			throw new Error(error);
		});
};

// exports.findGameById = function(id) {
// 	return apicalypse(requestOptions)
// 		.fields(['name', 'tags'])
// 		.limit(1)
// 		.where(`id=${id}`)
// 		.request('/games')
// 		.then((results) => results.data[0])
// 		.catch((error) => {
// 			logger.warn(error);
// 			return null;
// 		});
// };
