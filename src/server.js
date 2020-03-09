// Dependencies
require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');

server
	.use('/static', express.static('./public'))
	.use(bodyParser.urlencoded({ extended: true}))
	.set('view engine', 'ejs')
	.set('views', './src/views' )
	.get('/', (req, res) => res.render('other/home.ejs'))
	.use((req, res) => res.status(404).render('other/notfound.ejs'))
	.use((err, req, res) => res.status(500).render('other/error.ejs'))
	.listen(process.env.PORT || 8000);
