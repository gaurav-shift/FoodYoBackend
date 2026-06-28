const AddressRepository = require('../repositories/address-repository');
const Address = require('../models/address');
const AppError = require('../errors/app-error');
const { StatusCodes } = require('http-status-codes');

class AddressService {

    constructor() {
        this.addressRepository = new AddressRepository(Address);
    }

    async createAddress(data, userId) {
    try {

        const addresses =
            await this.addressRepository.getAddressesByUserId(userId);

        data.userId = userId;

        if (addresses.length === 0) {
            data.isDefault = true;
        }

        const address =
            await this.addressRepository.create(data);

        return this.toSafeAddress(address);

    } catch (error) {
        throw error;
    }
}

    async getAddresses(userId) {
    try {

        const addresses =
            await this.addressRepository.getAddressesByUserId(userId);

        return addresses.map((address) =>
            this.toSafeAddress(address)
        );

    } catch (error) {
        throw error;
    }
}

    async updateAddress(id, data, userId) {
    try {

        const address = await this.addressRepository.getById(id);

        if (!address) {
            throw new AppError(
                'Address not found',
                StatusCodes.NOT_FOUND
            );
        }

        if (address.userId.toString() !== userId) {
            throw new AppError(
                'You are not authorized to update this address',
                StatusCodes.FORBIDDEN
            );
        }

    //     console.log("id =>", id);
    // console.log("data =>", data);
    // console.log("userId =>", userId);

        if (data.isDefault === true) {
            await this.addressRepository.clearDefaultAddress(userId);
        }

        const updatedAddress = await this.addressRepository.update(id, data);
        return this.toSafeAddress(updatedAddress);

    } catch (error) {
        throw error;
    }
}

    async deleteAddress(id, userId) {
    try {

        const address = await this.addressRepository.getById(id);

        if (!address) {
            throw new AppError(
                "Address not found",
                StatusCodes.NOT_FOUND
            );
        }

        if (address.userId.toString() !== userId) {
            throw new AppError(
                "You are not authorized to delete this address",
                StatusCodes.FORBIDDEN
            );
        }

        const addresses =
            await this.addressRepository.getAddressesByUserId(userId);

        if (addresses.length === 1) {
            throw new AppError(
                "At least one address is required",
                StatusCodes.BAD_REQUEST
            );
        }

        const wasDefault = address.isDefault;

        await this.addressRepository.delete(id);

        if (wasDefault) {

            const remainingAddresses =
                await this.addressRepository.getAddressesByUserId(userId);

            if (remainingAddresses.length > 0) {

                await this.addressRepository.update(
                    remainingAddresses[0].id,
                    { isDefault: true }
                );

            }

        }

    } catch (error) {
        throw error;
    }
}

    toSafeAddress(address) {
    return {
        id: address.id,
        label: address.label,
        receiverName: address.receiverName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        latitude: address.latitude,
        longitude: address.longitude,
        isDefault: address.isDefault
    };
}
}

module.exports = AddressService;