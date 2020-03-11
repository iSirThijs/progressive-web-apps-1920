const router = require('express').Router();

router
	.get('/') // account root - account page with sections to chang password, name et
	.get('/logout', logout);


function logout(req, res) {
	req.session.destroy();
	res.redirect('/');
}


module.exports = router;