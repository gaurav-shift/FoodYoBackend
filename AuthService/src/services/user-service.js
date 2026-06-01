const UserRepository = require('../repositories/user-repository');
const bcrypt  = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

class UserService{
    constructor(){
        this.UserRepository = new UserRepository(User);
    }

    async create(data){
        try{
            const existingUser = await this.UserRepository.getByEmail(data.email);
            if(existingUser){
                throw new Error('User with this email already exists');
            }
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);

            const user = await this.UserRepository.create(data);
            return user;

        }catch(err){
            console.log("Error in creating user:\n", err);
            throw err;
        }
    }

    async signIn(email, plainpassword){
        try{
            const user = await this.UserRepository.getByEmail(email);
            if(!user){
                console.log("User not found with this email");
                throw new Error('User not found with this email');
            }
            const passwordMatch = await this.checkPassword(plainpassword, user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw new Error('Incorrect Password');
            }
            const payload = { userId: user.id};
            const token = generateToken(payload);

            const safeUser = {
                id: user.id,
                email: user.email,
                name: user.name
            }

            return { user: safeUser, token };
           
        }catch(err){
            console.log("Error in signIn:\n", err);
            throw err;
        }
    }
    async checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compare(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparision");
            throw error;
        }
    }

    async getProfile(userId){
        try{
            const user = await this.UserRepository.getById(userId);

            if(!user) {
                console.log("User not found with this id");
                throw new Error('User not found with this id');
            }

            const safeUser = {
                id: user.id,
                email: user.email,
                name: user.name
            }

            return safeUser;
        } catch (error) {
            console.log("Error in fetching user profile:\n", error);
            throw error;
        }
    }
   

}

module.exports = UserService;