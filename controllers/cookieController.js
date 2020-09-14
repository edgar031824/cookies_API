const striptags = require('striptags');

// helper values
const cookieSettings = {
	domain: '.mydomain.com', // top level domain to set the cookies
	secure: true, // setting secure flag to false so we can test everything up on a local environment without the need to setup certificates
	sameSite: 'none', // setting the sameSite policies
	maxAge: 1000 * 180 * 24 * 60 * 60, // cookie max age in miliseconds
};

exports.getCookie = (req, res) => {
	let cookies = req.cookies;
	let response = {};
	const cookieName = cookies['cookieName'];

	if (cookieName) {
		response['cookieName'] = striptags(cookieName);
	}

	res.status(200).json(response);
}


exports.saveCookie = (req, res) => {
	const cookieName = striptags(req.body['cookieName']);

	if (googlecookie) {
		res.cookie('cookieName', cookieName, cookieSettings);
	}

	res.status(200).json({ msg: 'OK' });
}
