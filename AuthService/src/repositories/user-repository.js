class UserRepository {
    constructor(User) {
        this.User = User;
    }

    async create(data){
        try{
            const user = await this.User.create(data);
            return user;
        }catch(err){
            throw err;
        }
    }

    async getByEmail(email){
        try{
            const user = await this.User.findOne({ email }).select('+password');
            return user;
        }catch(err){
            throw err;
        }
    }
    async getById(id){
        try{
            const user = await this.User.findById(id);
            return user;
        }catch(err){
            throw err;
        }
    }
        
}

module.exports = UserRepository;