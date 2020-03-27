// utils
const logger = require('log4js').getLogger('Data');


exports.checkImage = function(rawGamesList) {
	if(rawGamesList.count == 0 ) return rawGamesList;
	return rawGamesList.map((game) => {
		game.background_image = game.background_image ? game.background_image : '/public/icons/notfound.png';
		return game;
	});
};

exports.checkParentPlatforms = function(rawGamesList) {
	if(rawGamesList.count == 0 ) return rawGamesList;
	return rawGamesList.map((game) => {
		game.parent_platforms = game.parent_platforms ? game.parent_platforms : [];
		return game;
	});
};