const CrudRepository = require('./crud-repository');
const Menu = require('../models/menu');

class MenuRepository extends CrudRepository {
    constructor() {
        super(Menu);
    }
    
    async getMenusByRestaurantId(restaurantId) {
    try {
        return await this.model.find({
            restaurantId,
            isAvailable: true
        });
    } catch (error) {
        throw error;
    }
}
}

module.exports = MenuRepository;