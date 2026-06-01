const { body, validationResult } = require('express-validator');
const AppError = require('../errors/app-error');
const { StatusCodes } = require('http-status-codes');

const validateSignUp = [
    body('name').notEmpty().isLength({ min: 3 , max: 50 }),
    body('email').notEmpty().isEmail(),
    body('password').isLength({ min: 6 }).notEmpty(),
    (req, res, next) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
]


const validateSignIn = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 6 }),
    (req, res, next) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
]

module.exports = {
    validateSignUp,
    validateSignIn
}