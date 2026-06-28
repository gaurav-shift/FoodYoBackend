const CrudRepository = require('./crud-repository');
const Address = require('../models/address');

class AddressRepository extends CrudRepository {
    constructor() {
        super(Address);
    }

    async getAddressesByUserId(userId) {
        try {
            return await this.model
                .find({ userId })
                .sort({ isDefault: -1, createdAt: -1 });

        } catch (error) {
            throw error;
    }
}
    
    async clearDefaultAddress(userId) {
    try {

        await this.model.updateMany(
            { userId },
            { isDefault: false }
        );

    } catch (error) {
        throw error;
    }
}

    async clearDefaultAddress(userId) {
    try {
        return await this.model.updateMany(
            { userId },
            { isDefault: false }
        );
    } catch (error) {
        throw error;
    }
}

}

module.exports = AddressRepository;