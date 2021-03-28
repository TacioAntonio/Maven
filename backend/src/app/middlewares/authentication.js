const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const { APP_HASH } = require('../../config/configurations');

function checkAuthentication(req, res, next) {
    const authHeader = req.headers['authorization'];

    jwt.verify(authHeader, APP_HASH, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Ocorred a error." });
        }

        req.payload = payload;

        next();
    });
}

async function checkAuthorization(req, res, next) {
    const { userId } = req.payload;

    const user = await User.findById(userId);

    if (!user.isAdmin) {
        return res.status(403).json({ message: "Does not have authorization." });
    }

    next();
}

module.exports = {
    checkAuthentication,
    checkAuthorization
}