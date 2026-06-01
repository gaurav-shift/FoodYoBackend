const {verifyToken} = require('../utils/jwt');

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        req.user = decoded; // decoded token contains userId and other info like expiry and issuedAt
    } catch (err) {
        console.log("Error in verifying token:\n", err);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    next();



};


module.exports = {
    isAuthenticated
};