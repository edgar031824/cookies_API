let striptags = require('striptags');

const validateLength = (req, res, next) => {
	const cookieName = striptags(req.body['cookieName']);
	const allValues = [cookieName];
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