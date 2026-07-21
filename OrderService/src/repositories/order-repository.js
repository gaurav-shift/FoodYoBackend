const CrudRepository = require('./crud-repository');
const  Order  = require('../models/order');

class OrderRepository extends CrudRepository {
    constructor() {
        super(Order);
    }

    async getOrdersByUserId(userId) {
        return await Order.find({ userId }).sort({ createdAt: -1 });
    }
}

module.exports = OrderRepository;