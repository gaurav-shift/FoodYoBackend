class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.model.find({});
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CrudRepository;