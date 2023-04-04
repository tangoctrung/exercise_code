const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res.json({success: false, message: 'Error token'})

	try {
		const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.userId = data._id;
		req.typeAccount = data.typeAccount;
		req.accountName = data.accountName;
		return next();
	} catch (error) {
		console.log(error)
		return res.json({ success: false, message: 'Invalid token' })
	}

}

module.exports = verifyToken;