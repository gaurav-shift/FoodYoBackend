const express = require('express');

const AddressController = require('../../controllers/address-controller');
const { validateCreateAddress , validateAddressId , validateUpdateAddress} = require('../../validators/address-validator');
const { isAuthenticated } = require('../../middlewares/auth-middleware');

const router = express.Router();

const addressController = new AddressController();

router.post(
    '/',
    isAuthenticated,
    validateCreateAddress,
    (req, res, next) =>
        addressController.createAddress(req, res, next)
);

router.get(
    '/',
    isAuthenticated,
    (req, res, next) =>
        addressController.getAddresses(req, res, next)
);

router.put(
    '/:id',
    isAuthenticated,
    validateAddressId,
    validateUpdateAddress,
    (req, res, next) =>
        addressController.updateAddress(req, res, next)
);

router.delete(
    '/:id',
    isAuthenticated,
    validateAddressId,
    (req, res, next) =>
        addressController.deleteAddress(req, res, next)
);

module.exports = router;