const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '24h'
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken
};