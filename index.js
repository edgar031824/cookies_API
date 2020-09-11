const express = require('express');
const cors = require('cors');
const server = express();
const cookieParser = require("cookie-parser");
const port = 4000;
const corsOptions = {
	origin: function(origin, callback) {
		// for this example let's simply accept calls from any domain
		callback(null, true);
	},
	optionsSuccessStatus: 204,
	credentials: true,
	allowedHeaders: ['DNT', 'X-CustomHeader', 'Keep-Alive', 'User-Agent', 'X-Requested-With', 'If-Modified-Since', 'Cache-Control', 'Content-Type', 'Content-Range', 'Range', 'Pragma', 'Upgrade-Insecure-Requests'],
	methods: ['GET', 'POST', 'OPTIONS'],
	exposedHeaders: ['Cache-Control', 'Content-Language', 'Content-Type', 'Expires', 'Last-Modified', 'Pragma'],
};

//enable express.json to receive information through post request(do the same that bodyparse module)
server.use(express.json({ extended: true }));
// allow cors
server.use(cors(corsOptions));
// disable the header that shows this being an Express server
server.disable('x-powered-by');
// cookieparser, to make it easyer to read and write cookies
server.use(cookieParser());

server.options('/api/cmpV2');
// generic error handler
server.use(function(err, req, res, next) {
	try {
		let code = err.split(': ');
		if (isNaN(parseInt(code))) {
			res.status(code).send('');
		}
		else {
			res.status(500).send('Unexpected Error')
		}
	}
	catch (error) {
		res.status(400).send('Bad Request')
	}
});

server.use('/', require('./routes/cookie'));

// the '0.0.0.0' is only fot the deployment using heroku
server.listen(port, '0.0.0.0', () => {
	console.log(`running on port ${port}`);
});

