const express = require('express');

const UserController = require('../../controllers/user-controller');
const authvalidator = require('../../validators/auth-validators');
const authMiddleware = require('../../middlewares/auth-middleware');

const router = express.Router();

const userController = new UserController();

router.post(
    '/signup',
    authvalidator.validateSignUp,
    (req, res , next) => userController.signUp(req, res, next)
);

router.post(
    '/signin',
    authvalidator.validateSignIn,
    (req, res, next) => userController.signIn(req, res, next)
);

router.get(
    '/profile',
    authMiddleware.isAuthenticated,
    (req, res, next) => userController.getProfile(req, res, next)
);

module.exports = router;