const UserService = require('../services/user-service');
//const UserRepository = require('../repositories/user-repository');

const userService = new UserService();

class UserController{
    async signUp(req, res){
        try{
            const user = await userService.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            res.status(201).json({
                success: true,  
                message: "User created successfully",
                data: user,
                error: {}
            });
        }catch(err){
            res.status(500).json({
                success: false, 
                data: {},
                message: "Error in creating user",
                error: err.message
            });
        }
    }

    async signIn(req, res){
        try{
            const {email, password} = req.body;
            const user = await userService.signIn(email, password);

            res.status(200).json({
                success: true, 
                message: "User signed in successfully",
                data: user,
                error: {}
            });
        }catch(err){ 
            res.status(500).json({
                success: false, 
                message: "Error in signing in",
                error: err.message,
                data: {}
            });
        }   
    }

    async getProfile(req, res){
        try{
            const userId = req.user.userId;
            const user = await userService.getProfile(userId); 
            res.status(200).json({
                success: true, 
                message: "User profile fetched successfully",
                data: user,
                error: {}
            });
        }catch(err){
            res.status(500).json({
                success: false, 
                message: "Error in fetching user profile",
                error: err.message,
                data: {}
            });
        }
    }
}

module.exports = UserController;