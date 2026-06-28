const {JWT_SECRET, JWT_EXPIRY} = require('../config/serverConfig');
const jwt = require('jsonwebtoken');


const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};


const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};




module.exports = {
    generateToken,
    verifyToken
};