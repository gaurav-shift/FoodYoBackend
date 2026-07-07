const { body, query, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { MENU_CATEGORIES } = require('../utils/constants');

const validateCreateMenu = [

    body('restaurantId')
        .notEmpty()
        .withMessage('Restaurant id is required')
        .isMongoId()
        .withMessage('Invalid restaurant id'),

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Name must be between 3 and 100 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 5, max: 500 })
        .withMessage('Description must be between 5 and 500 characters'),

    body('image')
        .trim()
        .notEmpty()
        .withMessage('Image is required')
        .isURL()
        .withMessage('Invalid image URL'),

    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
        .isIn(MENU_CATEGORIES)
        .withMessage('Invalid category'),

    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 1 })
        .withMessage('Price must be greater than 0'),

    body('isVeg')
        .optional()
        .isBoolean()
        .withMessage('isVeg must be boolean'),

    body('preparationTime')
        .notEmpty()
        .withMessage('Preparation time is required')
        .isInt({ min: 1 })
        .withMessage('Preparation time must be at least 1 minute'),

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

const validateRestaurantId = [

    query('restaurantId')
        .notEmpty()
        .withMessage('Restaurant id is required')
        .isMongoId()
        .withMessage('Invalid restaurant id'),

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
    validateCreateMenu,
    validateRestaurantId
};