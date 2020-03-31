const logger = require('log4js').getLogger('RAWG API');
const axios = require('axios');
const request = axios.create({
	baseURL: 'https://api.rawg.io/api'
});


// Return an array of objects of 10 games containing the id, cover_id en name.
exports.getList = function(endpoint, params) {
	const searchParams = new URLSearchParams(params);

	return request.get(`/${endpoint}?${searchParams.toString()}`)
		.then((results) => results.data)
		.catch((error) => {
			logger.warn(error.message);
			throw error;
		});
};


exports.getNewTrendingList = function(){
	return axios.get('https://rawg.io/api/games/lists/main?discover=true&ordering=-relevance&page_size=40&page=1')
		.then((results) => results.data)
		.catch((error) => {
			logger.warn(error.message);
			throw error;
		});
};


exports.getGameDetails = function(id) {
	return request.get(`/games/${id}`)
		.then((results) => results.data)
		.catch((error) => {
			logger.warn(error.message);
			throw error;
		});
};

exports.getScreenhosts = function(id){
	return request.get(`/games/${id}/screenshots`)
		.then((results) => results.data.results)
		.then((screens) => screens.map((screen) => screen.image) )
		.catch((error) => {
			logger.warn(error.message);
			throw error;
		});
};