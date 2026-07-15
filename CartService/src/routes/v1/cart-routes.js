const express = require('express');

const router = express.Router();

const CartController = require('../../controllers/cart-controller');
const { isAuthenticated } = require('../../middlewares/auth');
const { validateAddToCart } = require('../../validators/cart-validator');
const {validateUpdateQuantity} = require('../../validators/cart-validator');

const cartController = new CartController();

router.post(
    '/items',
    isAuthenticated,
    validateAddToCart,
    (req, res, next) =>
        cartController.addToCart(req, res, next)
);

router.get(
    '/',
    isAuthenticated,
    (req, res, next) =>
        cartController.getCart(req, res, next)
);

router.patch(
    '/items/:menuId',
    isAuthenticated,
    validateUpdateQuantity,
    (req, res, next) =>
        cartController.updateQuantity(req, res, next)
);

module.exports = router;