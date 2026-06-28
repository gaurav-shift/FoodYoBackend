const { body, validationResult , param} = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const validateCreateAddress = [

    body('label')
        .optional()
        .trim()
        .isString()
        .isLength({ max: 25 }),

    body('receiverName')
        .trim()
        .notEmpty()
        .isLength({ min: 3, max: 30 }),

    body('phone')
        .trim()
        .notEmpty()
        .isLength({ min: 10, max: 10 })
        .isNumeric(),

    body('addressLine1')
        .trim()
        .notEmpty()
        .isLength({ min: 5, max: 200 }),

    body('addressLine2')
        .optional()
        .trim()
        .isLength({ max: 200 }),

    body('city')
        .trim()
        .notEmpty()
        .isLength({ min: 2, max: 50 }),

    body('state')
        .trim()
        .notEmpty()
        .isLength({ min: 2, max: 50 }),

    body('pincode')
        .trim()
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .isNumeric(),

    body('latitude')
        .optional()
        .isFloat(),

    body('longitude')
        .optional()
        .isFloat(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Validation failed',
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

const validateUpdateAddress = [

    body('label')
        .optional()
        .trim()
        .isString()
        .isLength({ max: 25 }),

    body('receiverName')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 }),

    body('phone')
        .optional()
        .trim()
        .isLength({ min: 10, max: 10 })
        .isNumeric(),

    body('addressLine1')
        .optional()
        .trim()
        .isLength({ min: 5, max: 200 }),

    body('addressLine2')
        .optional()
        .trim()
        .isLength({ max: 200 }),

    body('city')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }),

    body('state')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }),

    body('pincode')
        .optional()
        .trim()
        .isLength({ min: 6, max: 6 })
        .isNumeric(),

    body('latitude')
        .optional()
        .isFloat(),

    body('longitude')
        .optional()
        .isFloat(),

    body('isDefault')
        .optional()
        .isBoolean(),

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

const validateAddressId = [

    param('id').isMongoId(),

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
    validateCreateAddress,
    validateUpdateAddress,
    validateAddressId
};