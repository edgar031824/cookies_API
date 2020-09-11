const striptags = require('striptags');

// helper values
const cookieSettings = {
	domain: '.consensu.org', // top level domain to set the cookies
	secure: true, // setting secure flag to false so we can test everything up on a local environment without the need to setup certificates
	sameSite: 'none', // setting the sameSite policies
	maxAge: 1000 * 180 * 24 * 60 * 60, // cookie max age in miliseconds
};

// this method works only for v2
exports.getCookie = (req, res) => {
	let cookies = req.cookies;
	let response = {};
	const googlecookie = cookies['addtl_consent'];
	const euconsent_v2 = cookies['euconsent-v2'];
	const _cmpRepromptHash = cookies['_cmpRepromptHash'];
	const noniabvendorconsent = cookies['noniabvendorconsent'];

	// if there was a 'euconsent-v2' cookie present in the request, we send it's value back in the response's body
	if (euconsent_v2) {
		response['euconsent-v2'] = striptags(euconsent_v2);
	}
	// if there was a '_cmpRepromptHash' cookie present in the request, we send it's value back in the response's body
	if (_cmpRepromptHash) {
		response['_cmpRepromptHash'] = striptags(_cmpRepromptHash);
	}
	// if there was a 'googlecookie' cookie present in the request, we send it's value back in the response's body
	if (googlecookie) {
		response['addtl_consent'] = striptags(googlecookie);
	}
	// if there was a 'noniabvendorconsent' cookie present in the request, we send it's value back in the response's body
	if (noniabvendorconsent) {
		response['noniabvendorconsent'] = striptags(noniabvendorconsent);
	}

	res.status(200).json(response);
}

// this method works only for v2
exports.saveCookie = (req, res) => {
	const googlecookie = striptags(req.body['addtl_consent']);
	const euconsent_v2 = striptags(req.body['euconsent-v2']);
	const _cmpRepromptHash = striptags(req.body['_cmpRepromptHash']);
	const noniabvendorconsent = striptags(req.body['noniabvendorconsent']);

	if (googlecookie) {
		res.cookie('addtl_consent', googlecookie, cookieSettings);
	}

	if (euconsent_v2) {
		res.cookie('euconsent-v2', euconsent_v2, cookieSettings);
	}

	if (_cmpRepromptHash) {
		res.cookie('_cmpRepromptHash', _cmpRepromptHash, cookieSettings);
	}

	if (noniabvendorconsent) {
		res.cookie('noniabvendorconsent', noniabvendorconsent, cookieSettings);
	}

	res.status(200).json({ msg: 'OK' });
}
