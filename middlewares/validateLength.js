let striptags = require('striptags');

const validateLength = (req, res, next) => {
	const googlecookie = striptags(req.body['addlt_consent']);
	const euconsent_v2 = striptags(req.body['euconsent-v2']);
	const cmpRepromptHash = striptags(req.body['_cmpRepromptHash']);
	const noniabvendorconsent = striptags(req.body['noniabvendorconsent ']);
	const allValues = [googlecookie, euconsent_v2, cmpRepromptHash, noniabvendorconsent];
	const checkLength = (cookieValue) => {
		if (cookieValue && cookieValue.length > 1600) {
			res.status(400).json({
				message: 'cookie length not valid'
			});
			error = true;
		}
	}
	let error = false;

	try {
		allValues.forEach(item => {
			checkLength(item);
		});
		if (error) {
			return;
		} else {
			next();
		}
	} catch (error) {
		res.status.json(error);
	}

}

module.exports = validateLength;