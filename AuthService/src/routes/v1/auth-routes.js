const express = require('express');

const UserController = require('../../controllers/user-controller');
const authvalidator = require('../../validators/auth-validators');

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

module.exports = router;