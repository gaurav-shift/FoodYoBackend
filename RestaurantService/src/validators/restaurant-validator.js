const { body, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const validateCreateRestaurant = [

    body('name')
        .trim()
        .notEmpty()
        .isLength({ min: 2, max: 100 }),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 200 }),

    body('image')
        .notEmpty()
        .isURL(),

    body('cuisine')
        .isArray({ min: 1 }),

    body('address')
        .trim()
        .notEmpty(),

    body('city')
        .trim()
        .notEmpty(),

    body('state')
        .trim()
        .notEmpty(),

    body('pincode')
        .trim()
        .notEmpty(),

    body('latitude')
        .optional()
        .isFloat(),

    body('longitude')
        .optional()
        .isFloat(),

    body('deliveryTime')
        .isInt({ min: 1 }),

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
    validateCreateRestaurant
};