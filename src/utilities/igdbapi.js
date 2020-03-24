const logger = require('log4js').getLogger('IGDB API');
const apicalypse = require('apicalypse').default;
const requestOptions =
	{
		baseURL: 'https://api-v3.igdb.com',
		headers: {
			'Accept' : 'application/json',
			'user-key' : process.env.IGDB_KEY
		}
	};

// Returns the imagelinkfor a cover from an cover ID. If there is no image, a static file link is returned.
exports.coverLink = function(id, size){
	return apicalypse(requestOptions)
		.fields('image_id')
		.limit(1)
		.where('id =' + id )
		.request('/covers')
		.then((results) => `https://images.igdb.com/igdb/image/upload/t_${size}/${results.data[0].image_id}.png`)
		.catch((error) => {
			logger.debug(`Failed to get image: ${error.message}`);
			return '/public/icons/notfound.png';
		});
};

// Return an array of objects of 10 games containing the id, cover_id en name.
exports.findGames = function(query) {
	return apicalypse(requestOptions)
		.fields(['id', 'name', 'slug', 'cover', 'dlcs', 'expansions', 'popularity'])
		.limit(10)
		.search(query)
		.where('version_parent=null')
		.request('/games')
		.then((results) => results.data)
		.catch((error) => {
			logger.warn(error);
			throw new Error(error);
		});
};

exports.findGameById = function(id) {
	return apicalypse(requestOptions)
		.fields(['name', 'tags'])
		.limit(1)
		.where(`id=${id}`)
		.request('/games')
		.then((results) => results.data[0])
		.catch((error) => {
			logger.warn(error);
			return null;
		});
};
