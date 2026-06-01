const UserService = require('../services/user-service');
//const UserRepository = require('../repositories/user-repository');

const userService = new UserService();

class UserController{
    async signUp(req, res , next){
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
            next(err);
        }
        }
    

    async signIn(req, res, next){
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
            next(err);
        }   
    }

    async getProfile(req, res, next){
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
            next(err);
        }
    }
}

module.exports = UserController;