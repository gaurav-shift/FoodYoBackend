const { body, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const validateAddToCart = [

    body('menuId')
        .notEmpty()
        .withMessage('Menu id is required')
        .isMongoId()
        .withMessage('Invalid menu id'),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Validation failed",
                data: null,
                error: {
                    statusCode: StatusCodes.BAD_REQUEST,
                    details: errors.array()
                }
            });
        }

        next();
    }
];

module.exports = {
    validateAddToCart
};