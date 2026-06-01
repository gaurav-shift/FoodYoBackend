const express = require('express');

const UserController = require('../../controllers/user-controller');
const authvalidator = require('../../validators/auth-validators');
const authMiddleware = require('../../middlewares/auth-middleware');

const router = express.Router();

const userController = new UserController();

router.post(
    '/signup',
    authvalidator.validateSignUp,
    (req, res) => userController.signUp(req, res)
);

router.post(
    '/signin',
    authvalidator.validateSignIn,
    (req, res) => userController.signIn(req, res)
);

router.get(
    '/profile',
    authMiddleware.isAuthenticated,
    (req, res) => userController.getProfile(req, res)
);

module.exports = router;