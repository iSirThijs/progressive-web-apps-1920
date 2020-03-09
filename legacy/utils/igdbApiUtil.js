const request = require('apicalypse').default;
const requestOptions =
	{
		queryMethod: 'body',
		method: 'get',
		baseURL: 'https://api-v3.igdb.com',
		headers: {
			'Accept' : 'application/json',
			'user-key' : process.env.IGDB_API_KEY
		},
		responseType: 'json'
	};

// Returns the imagelinkfor a cover from an cover ID. If there is no image, a static file link is returned.
exports.coverLink = async function(id, size){
	try {
		const result =
		await request(requestOptions)
			.fields('image_id')
			.limit(1)
			.where('id =' + id )
			.request('/covers');

		const data = result.data[0];
		let coverLink = 'https://images.igdb.com/igdb/image/upload/t_' + size + '/' + data.image_id + '.png';
		return coverLink;
	} catch(err) {
		let coverLink = '/static/icons/notfound.png';
		return coverLink;
	}
};

// Return an array of objects of 10 games containing the id, cover_id en name.
exports.findGames = async function(query) {
	try {
		const results =
				await request(requestOptions)
					.fields('name, cover')
					.limit(10)
					.search(query)
					.request('/games');

		return results.data;
	} catch(err) {
		throw {type: 'error'};
	}
};

exports.findGameById = async function(id) {
	try {
		const results =
			await request(requestOptions)
				.fields('name, cover')
				.limit(1)
				.where('id =' + id)
				.request('/games');

		return results.data;
	} catch(err) {
		throw {type: 'error'};
	}
};
