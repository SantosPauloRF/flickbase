const httpStatus = require("http-status")
const { ApiError } = require("../middlewares/apiError")
const { userService, authService } = require("../services")

const userController = {

    async profile (req, res, next) {
        try{
            const user = await userService.findUserById(req.user._id)
            if(!user){
               throw new ApiError(httpStatus.NOT_FOUND, "User not found") 
            }
            res.json(res.locals.permission.filter(user._doc))
        }catch(err) {
            next(err)
        }
    },
    async updateProfile (req, res, next){
        try{
            const user = await userService.updateUserProfile(req)
            res.json(res.locals.permission.filter(user._doc))
        }catch(err) {
            next(err)
        }

    },
    async updateUserEmail (req, res, next){
        try{
            const user = await userService.updateUserEmail(req)
            const token = await authService.genAuthToken(user)

            console.log("send email to verified")

            res.cookie("x-access-token", token)
            .send ({
                user: res.locals.permission.filter(user._doc),
                token
            })

        }catch(err) {
            next(err)

        }
    }
    
}

module.exports = userController;