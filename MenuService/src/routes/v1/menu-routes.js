const express = require('express');

const MenuController = require('../../controllers/menu-controller');
const menuValidator = require('../../validators/menu-validator');

const router = express.Router();

const menuController = new MenuController();

router.get(
    '/',
    menuValidator.validateRestaurantId,
    (req, res, next) =>
        menuController.getMenusByRestaurantId(req, res, next)
);

router.post(
    '/',
    menuValidator.validateCreateMenu,
    (req, res, next) =>
        menuController.createMenu(req, res, next)
);

module.exports = router;