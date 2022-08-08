const { authService } = require("../services")

const authController = {
    async register(req, res, next){
        try{
            const { email, password } = req.body
            const user = await authService.createUser(email, password);

            res.json(user)

        } catch(err) {
            console.log(err.message)
        }
    }
}

module.exports = authController;
