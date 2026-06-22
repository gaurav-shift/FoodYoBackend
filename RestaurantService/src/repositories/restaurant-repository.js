const CrudRepository = require('./crud-repository');
const Restaurant = require('../models/restaurant');

class RestaurantRepository extends CrudRepository {
    constructor() {
        super(Restaurant);
    }

    async findByNameAndAddress(name, address, city, state) {
        try {
            return await this.model.findOne({
                name,
                address,
                city,
                state
            });
        } catch (error) {
            throw error;
        }
    }

    async getRestaurantsByCity(city) {
        try {
            return await this.model.find({
                city,
                isOpen: true
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RestaurantRepository;