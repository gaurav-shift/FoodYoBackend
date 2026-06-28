const AddressService = require('../services/address-service');

const addressService = new AddressService();

class AddressController {

    async createAddress(req, res, next) {
        try {

            const address = await addressService.createAddress(
                req.body,
                req.user.userId
            );

            return res.status(201).json({
                success: true,
                message: "Address created successfully",
                data: address,
                error: null
            });

        } catch (error) {
            next(error);
        }
    }

    async getAddresses(req, res, next) {
    try {

        const addresses = await addressService.getAddresses(
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "Addresses fetched successfully",
            data: addresses,
            error: null
        });

    } catch (error) {
        next(error);
    }
}

    async updateAddress(req, res, next) {
    try {
        console.log("BODY =>", req.body);
        const address = await addressService.updateAddress(
            req.params.id,
            req.body,
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: address,
            error: null
        });

    } catch (error) {
        next(error);
    }
}

    async deleteAddress(req, res, next) {
    try {

        await addressService.deleteAddress(
            req.params.id,
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
            data: null,
            error: null
        });

    } catch (error) {
        next(error);
    }
}

}

module.exports = AddressController;