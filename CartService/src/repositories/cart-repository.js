const CrudRepository = require('./crud-repository');
const Cart = require('../models/cart');

class CartRepository extends CrudRepository {
    
    constructor() {
        super(Cart);
    }

    async getCartByUserId(userId) {
        try {
            return await this.model.findOne({ userId });
        } catch (error) {
            throw error;
        }
    }

    async deleteCartByUserId(userId) {
    try {
        return await this.model.findOneAndDelete({ userId });
    } catch (error) {
        throw error;
    }
}

}

    

module.exports = CartRepository;