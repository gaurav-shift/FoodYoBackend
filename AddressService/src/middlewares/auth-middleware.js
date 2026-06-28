const { verifyToken } = require('../utils/jwt');
const { StatusCodes } = require('http-status-codes');

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Authorization header missing or malformed',
            data: null,
            error: {
                "code": StatusCodes.UNAUTHORIZED
            }
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        //console.log(decoded);
        req.user = decoded;
    } catch (err) {
        console.log('Error in verifying token:\n', err);

        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid or expired token',
            data: null,
            error: {
                "code": StatusCodes.UNAUTHORIZED
            }
        });
    }

    next();
};

module.exports = {
    isAuthenticated
};